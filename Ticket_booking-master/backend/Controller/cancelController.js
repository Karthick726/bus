const bookingSchema = require("../Schema/BookingSchema");
const cancelSms = require("../utility/cancelSms");
const instance = require("../razorpay/Razorpay");
const bookingseat = require("../Schema/BookSeatSchema");

bookingSchema.createIndexes({ date: 1, "bookings.PNR": 1 });

exports.cancelTicket = async (req, res) => {
  console.log(req.body);

  const { date, PNR, mobileNumber } = req.body;

  try {
    const otpVerifyDoc = await bookingSchema.findOne({
      date,
    });



    if(!otpVerifyDoc){
       return res.status(400).json({ message: "Check the date" });
    }

    const findCorrectDocument = otpVerifyDoc.bookings.filter(
      (el) => el.mobileNumber === mobileNumber
    );

    console.log(findCorrectDocument);

    if (findCorrectDocument.length === 0) {
      let err = new Error("Please check the Mobile Number");
      err.status = 404;
      throw err;
    }

    const findCorrectPnr = findCorrectDocument.filter((el) => el.PNR === PNR);

    if (findCorrectPnr.length === 0) {
      let err = new Error("Please check the PNR");
      err.status = 404;
      throw err;
    }

    const cancelStatusCheck = findCorrectDocument.find((el) => el.PNR === PNR);

    if (cancelStatusCheck.bookingStatus === "Cancelled") {
      return res.status(400).json({ message: "Ticket already be cancelled." });
    }

    const otpGeneration = Math.floor(1000 + Math.random() * 1000);

    const otpSend = await cancelSms(mobileNumber, otpGeneration);

    const cancelOtpCreatedAt = Date.now() + 15 * 60 * 1000;

    if (otpSend.submitResponses[0].statusCode === 200) {
      const otpSaveDb = await bookingSchema.updateOne(
        { date, "bookings.PNR": PNR },
        {
          $set: {
            "bookings.$[book].cancelOTP": otpGeneration,
            "bookings.$[book].cancelOtpCreatedAt": cancelOtpCreatedAt,
            "bookings.$[book].otpAttempt": 3,
          },
        },
        {
          arrayFilters: [{ "book.PNR": PNR }],
        }
      );

      if (otpSaveDb.acknowledged === true) {
        res.status(200).json({ message: "success" });
      }
    }
  } catch (error) {
    console.log(error.message);

    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    }
  }
};

exports.otpVerification = async (req, res) => {
  console.log(req.body);

  const { otp, date, pnr } = req.body;

  try {
    const otpVerifyDoc = await bookingSchema.findOne({
      date,
    });

    const findCorrectDocument = otpVerifyDoc.bookings.find(
      (el) => el.PNR === pnr
    );

    if (findCorrectDocument.otpAttempt === 0) {
      await bookingSchema.updateOne(
        { date, "bookings.PNR": pnr },
        {
          $set: {
            "bookings.$[book].cancelOtpCreatedAt": "",
            "bookings.$[book].otpAttempt": "",
            "bookings.$[book].cancelOTP": "",
          },
        },
        {
          arrayFilters: [{ "book.PNR": pnr }],
        }
      );

      let err = new Error(
        "You have exhausted all OTP attempts. Please try again later."
      );
      err.status = 429;
      throw err;
    }

    if (findCorrectDocument.cancelOTP !== Number(otp)) {
      await bookingSchema.updateOne(
        { date, "bookings.PNR": pnr },
        {
          $inc: {
            "bookings.$[book].otpAttempt": -1,
          },
        },
        {
          arrayFilters: [{ "book.PNR": pnr }],
        }
      );

      let err = new Error("Please check the OTP");
      err.status = 401;
      throw err;
    }

    // ✅ Perform the refund
    const paymentId = findCorrectDocument.payment_id;
    const price = findCorrectDocument.price;

    const refundResult = await refundPayment(paymentId, price);

    if (!refundResult.success) {
      return res
        .status(500)
        .json({ message: "Refund failed", error: refundResult.error });
    }

    const statusChecked = await bookingSchema.updateOne(
      { date, "bookings.PNR": pnr },
      {
        $set: {
          "bookings.$[book].bookingStatus": "Cancelled",
          "bookings.$[book].otpAttempt": "",
          "bookings.$[book].cancelOtpCreatedAt": "",
          "bookings.$[book].cancelOTP": "",
          "bookings.$[book].cancelTime": new Date(),
        },
      },
      {
        arrayFilters: [{ "book.PNR": pnr }],
      }
    );

    const updateSeat = await bookingseat.findOne({ date });

    if (!updateSeat) {
      return res
        .status(404)
        .json({ message: "No seat record found for this date" });
    }

    // Keep only bookings not matching the canceled PNR
    updateSeat.bookings = updateSeat.bookings.filter(
      (value) => value.id !== findCorrectDocument.id
    );
    updateSeat.bookings.map((value) => console.log(value));

    // Save the updated document
    await updateSeat.save();

    if (statusChecked.acknowledged === true) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log(error);

    if (error.status === 401) {
      res.status(401).json({ message: error.message });
    }

    if (error.status === 429) {
      res.status(429).json({ message: error.message });
    }
  }
};

function calculateRefund({ ticketPrice }) {
  let totalFeePercent,
    razorpayFeePercent = 2.36,
    instantFee,
    profit;

  // Determine slab-based values
  if (ticketPrice <= 1000) {
    totalFeePercent = 4;
    instantFee = 7.99;
    profit = 10;
  } else if (ticketPrice <= 2500) {
    totalFeePercent = 3.28;
    instantFee = 11.99;
    profit = 15;
  } else {
    totalFeePercent = 3.22;
    instantFee = 15.99;
    profit = 20;
  }

  console.log(totalFeePercent, instantFee, profit);

  const totalFee = (ticketPrice * totalFeePercent) / 100;
  const amountReceived = ticketPrice - totalFee;
  const refundAmount = amountReceived - profit - instantFee;

  return {
    refundAmount: refundAmount.toFixed(2),
  };
}

const refundPayment = async (paymentId, amount = null) => {
  try {
    const refundOptions = {
      speed: "optimum",
    };

    if (amount) {
      const refundValue = calculateRefund({ ticketPrice: amount }).refundAmount;
      console.log(refundValue);
      refundOptions.amount = Math.round(refundValue * 100);
    }

    console.log(refundOptions);

    const refund = await instance.payments.refund(paymentId, refundOptions);

    return { success: true, refund };
  } catch (error) {
    console.error("Refund error:", error);
    return { success: false, error: error.message };
  }
};



exports.resetOTP = async (req, res) => {
  const { date, pnr } = req.body;

  try {
    const resetOTP = await bookingSchema.updateOne(
      { date, "bookings.PNR": pnr },
      {
        $set: {
          "bookings.$[book].cancelOTP": "",
        },
      },
      {
        arrayFilters: [{ "book.PNR": pnr }],
      }
    );

    if (resetOTP) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};