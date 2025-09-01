const Booking = require("../Schema/BookingSchema");
const Bookseat = require("../Schema/BookSeatSchema");
const contactModel = require("../Schema/AdminContactSchema");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const package = require("../Schema/package");
const path = require("path");
const sendSms = require("../utility/bookingSms");
const axios = require("axios");
const mongoose = require("mongoose");
const crypto = require("crypto");
const instance = require("../razorpay/Razorpay");

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayResponse, date, bookingData } = req.body;

    console.log("req body",req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpayResponse;

    const expectedSignature = crypto
      .createHmac("sha256", "QS3qMqWrIoIvzBS4vPrZTm3t")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }


    const seatDoc = await Bookseat.findOne({ date });
    console.log("seatDoc",seatDoc)
    const selectedSeatIds = bookingData.map((s) => s.id);

    if (!seatDoc) {
      return res.status(404).json({ message: "Seat data not found" });
    }

    const now = new Date();

    // Find locked seats
    const lockedSeats = seatDoc.bookings.filter(
      (b) => selectedSeatIds.includes(b.id) && b.status === "locked"
    );

    // if (lockedSeats.length !== bookingData.length) {
    //   return res.status(400).json({
    //     message: "Some seats are not locked or already booked.",
    //   });
    // }

    // Update seat status to "booked"
    seatDoc.bookings = seatDoc.bookings.map((seat) => {
      if (selectedSeatIds.includes(seat.id)) {
        return {
          ...seat,
          status: "booked",
          lockedAt: now,
        };
      }
      return seat;
    });

  const booked=  await seatDoc.save();

  console.log("booked",booked.bookings)

    res
      .status(200)
      .json({ success: true, message: "Payment verified and seats booked" });
  } catch (err) {
    console.error("Payment verification failed:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { date, bookingData } = req.body;

    const seatIds = bookingData.map((seat) => seat.id);
    const bookingSeat = await Bookseat.findOne({ date });

    if (!bookingSeat) {
      return res
        .status(404)
        .json({ message: "No seat document found for this date" });
    }

    // ✅ Update locked seats to booked
    for (let seat of bookingSeat.bookings) {
      if (seatIds.includes(seat.id) && seat.status === "locked") {
        seat.status = "booked";
      }
    }

    await bookingSeat.save();

    // 💰 Generate invoice
    const onePackages = (await package.find())[0];
    const invoiceNumber = `INV-${Date.now()}`;
    let totalAmount = 0;

    const passengers = bookingData.map((row) => {
      totalAmount += parseFloat(row.price);
      return {
        name: row.name,
        mobileNumber: row.mobileNumber,
        age: row.age,
        gender: row.gender,
        agegroup: row.agegroup,
        seatNumber: row.number,
        PNR: row.PNR,
        price: row.price,
      };
    });

    const pdfBuffer = await generateInvoice(
      onePackages,
      invoiceNumber,
      date,
      passengers,
      totalAmount
    );

    console.log(bookingData);


    //  const totalPrice = bookingData.reduce((sum, value) => sum + Number(value.price || 0), 0); // 👈 Safe fallback for NaN

    // const totalTicket = bookingData.length;

    // const bookingDatas = bookingData.map((value) => {
    //   return {
    //     id: value.id,
    //     number: value.number,
    //     row: value.row,
    //     price: value.price,
    //     name: value.name,
    //     age: value.age,
    //     gender: value.gender,
    //     agegroup: value.agegroup,
    //     mobileNumber: value.mobileNumber,
    //     email: value.email,
    //     proof: value.proof,
    //     proofIdNumber: value.proofIdNumber,
    //     PNR: value.PNR,
    //     order_id: value.order_id,
    //     payment_id: value.payment_id,
    //     totalprice: totalPrice,
    //     totalTicket: totalTicket,
    //   };
    // });

    // console.log("bookingData",bookingDatas)

    // 🧾 Save to Booking collection (for admin records, history, etc.)
    const booking = await Booking.findOne({ date });
    if (booking) {
         
  booking.bookings = booking.bookings.map(b => {
    const newData = bookingData.find(nb => nb.id === b.id);
    if (newData) {
      return { ...b.toObject(), ...newData, bookingStatus: "Booked" };
    }
    return b;
  });

      await booking.save();
      // 📲 Send SMS
      const smsPromises = bookingData.map((each) => sendSms(date, each));
      const promiseResult = await Promise.all(smsPromises);
    } else {
        await Booking.create({
    date,
    bookings: bookingData.map(b => ({ ...b, bookingStatus: "Booked" })),
  });
      // 📲 Send SMS
      const smsPromises = bookingData.map((each) => sendSms(date, each));
      const promiseResult = await Promise.all(smsPromises);
    }

    // const smsPromises = bookingData.map((each) => sendSms(date, each));
    // await Promise.all(smsPromises);

    // 📨 Send invoice
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.webhooks= async (req, res) => {
  const secret = "Bus_Ticket_Booking_Nbs";

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest !== req.headers["x-razorpay-signature"]) {
    return res.status(400).json({ status: "Invalid signature" });
  }

  try {
    const event = req.body.event;

    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;
      const { order_id, id: payment_id, amount } = payment;

      console.log("✅ Payment Captured:", payment_id, "for order:", order_id);

      // ⚡ find seats using your mapping (store order_id → bookingData when creating order)
    const bookingSession = await Booking.findOne(
  { "bookings.order_id": order_id }, 
  { date: 1, bookings: 1 }
);

if (!bookingSession) return res.json({ status: "ok" });

// ✅ Get travel date
const travelDate = bookingSession.date;

// ✅ Update all passengers with this order_id
bookingSession.bookings.forEach(b => {
  if (b.order_id === order_id) {
    b.bookingStatus = "Booked";
    b.payment_id = payment_id;
  }
});

await bookingSession.save();

console.log("✅ All passengers updated for order:", order_id, "on date:", travelDate);

      // mark seats as booked in Bookseat
      const bookingDate = bookingSession.date;
      const seatIds = bookingSession.bookings.map(b => b.id);

      const seatDoc = await Bookseat.findOne({ date: bookingDate });
      if (seatDoc) {
        seatDoc.bookings.forEach(seat => {
          if (seatIds.includes(seat.id)) seat.status = "booked";
        });
        await seatDoc.save();
      }

      // generate PDF + send SMS
      const onePackages = (await package.find())[0];
      const invoiceNumber = `INV-${Date.now()}`;
      let totalAmount = bookingSession.bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);

      const passengers = bookingSession.bookings.map(row => ({
        name: row.name,
        mobileNumber: row.mobileNumber,
        age: row.age,
        gender: row.gender,
        agegroup: row.agegroup,
        seatNumber: row.number,
        PNR: row.PNR,
        price: row.price,
      }));

      const pdfBuffer = await generateInvoice(onePackages, invoiceNumber, bookingDate, passengers, totalAmount);

      // TODO: Email or save PDF to server
      console.log("📄 Invoice generated for order:", order_id);

      // send SMS
      const smsPromises = bookingSession.bookings.map((each) => sendSms(date, each));
      const promiseResult = await Promise.all(smsPromises);
    }

    if(event ==="payment.failed"){

      const payment = req.body.payload.payment.entity;
      const { order_id, id: payment_id, amount } = payment;

      const bookingSession = await Booking.findOne(
  { "bookings.order_id": order_id }, 
  { date: 1, bookings: 1 }
);

if (!bookingSession) {
  return res.json({ status: "ok" });
}

const travelDate = bookingSession.date;

bookingSession.bookings.forEach(b => {
  if (b.order_id === order_id) {
    b.bookingStatus = "Failed";
  }
});

await bookingSession.save();
    }

    res.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

const generateInvoice = (
  onePackages,
  invoiceNumber,
  date,
  passengers,
  totalAmount
) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    const logoPath = path.join(__dirname, "../assets/logo.png");
    const pageWidth = doc.page.width;
    const leftMargin = 40;
    const rightMargin = 40;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    // === Header ===
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, leftMargin, 40, { width: 80 });
    } else {
      console.warn("⚠️ Logo not found at:", logoPath);
    }

    doc
      .fontSize(18)
      .fillColor("#ec2125")
      .text("Temple Tourism", leftMargin, 50, {
        align: "right",
        width: contentWidth,
      });

    const contactStartY = doc.y + 5;

    doc
      .fontSize(10)
      .fillColor("#000")
      .text(
        "Email: templetourismkbk@gmail.com",
        leftMargin,
        contactStartY + 2,
        {
          width: contentWidth,
          align: "right",
        }
      )
      .text("Phone : +91 96559 44457", leftMargin, contactStartY + 20, {
        width: contentWidth,
        align: "right",
      })
      .text(
        "195 john selvaraj nagar, NBS tower, kumbakonam",
        leftMargin,
        contactStartY + 37,
        {
          width: contentWidth,
          align: "right",
        }
      );

    // Separator line below contact details
    const afterContactY = doc.y + 10;
    doc
      .moveTo(leftMargin, afterContactY)
      .lineTo(pageWidth - rightMargin, afterContactY)
      .dash(3, { space: 4 })
      .stroke("#e89e25")
      .undash();

    // === Package Details ===
    const packageTitleY = afterContactY + 10;
    doc
      .fontSize(14)
      .fillColor("#ec2125")
      .text("Package Details", leftMargin, packageTitleY);

    const packageDetailsY = doc.y + 5;

    doc
      .fontSize(14)
      .fillColor("#ec2125")
      .text(`${onePackages.packageName}`, leftMargin, packageDetailsY, {
        align: "center",
        width: contentWidth,
      });

    const detailsStartY = doc.y + 5;
    const leftColX = leftMargin;
    const rightColX = pageWidth - rightMargin - 250; // 150px wide right column

    doc.fontSize(10).fillColor("#000");

    // Left column
    doc.text(`Source: ${onePackages.source}`, leftColX, detailsStartY);
    doc.text(
      `Start Time: ${onePackages.startTime}`,
      leftColX,
      detailsStartY + 20
    );

    // Right column
    doc.text(
      `Destination: ${onePackages.destination}`,
      rightColX,
      detailsStartY,
      {
        align: "right",
      }
    );

    doc.text(
      `End Time: ${onePackages.endTime}`,
      rightColX,
      detailsStartY + 20,
      {
        align: "right",
      }
    );

    // Separator line below package details
    const afterPackageY = detailsStartY + 50;
    doc
      .moveTo(leftMargin, afterPackageY)
      .lineTo(pageWidth - rightMargin, afterPackageY)
      .dash(3, { space: 4 })
      .stroke("#e89e25")
      .undash();

    // === Invoice Info ===
    const invoiceTitleY = afterPackageY + 10;
    doc
      .fontSize(14)
      .fillColor("#ec2125")
      .text("Invoice Details", leftMargin, invoiceTitleY);

    const invoiceDetailsY = doc.y + 5;
    const invoiceRightX = pageWidth - rightMargin - 250;

    const today = new Date();
const bookingDate = `${today.getDate().toString().padStart(2, '0')}/${
  (today.getMonth() + 1).toString().padStart(2, '0')
}/${today.getFullYear()}`

    doc
      .fontSize(10)
      .fillColor("#000")
      .text(`Invoice No: ${invoiceNumber}`, leftMargin, invoiceDetailsY)
      .text(`Date of Booking: ${bookingDate}`, leftMargin, doc.y + 2)
      .text(`Date of Journey: ${date}`, invoiceRightX, invoiceDetailsY, {
        align: "right",
      });

    // Separator line below invoice info
    const afterInvoiceY = invoiceDetailsY + 30;
    doc
      .moveTo(leftMargin, afterInvoiceY)
      .lineTo(pageWidth - rightMargin, afterInvoiceY)
      .dash(3, { space: 4 })
      .stroke("#e89e25")
      .undash();

    // === Passenger Table ===
    const passengerTitleY = afterInvoiceY + 10;
    doc
      .fontSize(16)
      .fillColor("#ec2125")
      .text("Passenger Details", leftMargin, passengerTitleY);

    const tableTop = doc.y + 10;
    const rowHeight = 28; // Increased for 8px vertical padding (top + bottom)
    const colWidths = [40, 70, 70, 30, 50, 60, 60, 80, 50];

    const totalTableWidth = colWidths.reduce((a, b) => a + b, 0);
    const colX = colWidths.reduce((acc, w, i) => {
      acc.push((acc[i - 1] || leftMargin) + (i > 0 ? colWidths[i - 1] : 0));
      return acc;
    }, []);

    // Table Header
    const headers = [
      "S.No",
      "Name",
      "Mobile",
      "Age",
      "Gender",
      "Age Group",
      "Seat No.",
      "PNR",
      "Price",
    ];

    // Draw header background first
    doc
      .save()
      .rect(leftMargin, tableTop, totalTableWidth, rowHeight)
      .fill("#ccc")
      .stroke("#ccc")
      .restore();

    // Draw header text
    doc.fontSize(10).fillColor("#fff");
    headers.forEach((header, i) => {
      const x = colX[i];
      const options = {
        width: colWidths[i] - 10,
        align: header === "Price" ? "right" : "left",
      };
      doc
        .fillColor("#000")
        .fontSize(10)
        .stroke("#ccc")
        .text(header, x + 5, tableTop + 8, options); // 8px top padding
    });

    // Table Rows
    let y = tableTop + rowHeight;
    doc.fontSize(10).fillColor("#000");

    passengers.forEach((p, i) => {
      const row = [
        i + 1,
        p.name,
        p.mobileNumber,
        p.age,
        p.gender,
        p.agegroup,
        p.seatNumber,
        p.PNR,
        p.price,
      ];

      row.forEach((data, j) => {
        // Draw cell border
        doc.rect(colX[j], y, colWidths[j], rowHeight).stroke("#ccc");

        // Add text inside cell with vertical padding
        const options = {
          width: colWidths[j] - 10,
          align: headers[j] === "Price" ? "right" : "left",
        };
        doc.text(data.toString(), colX[j] + 5, y + 8, options); // 8px padding
      });

      y += rowHeight;
    });

    // Total Row
    const totalY = y + 5;
    doc
      .fontSize(12)
      .fillColor("#000")
      .text("Total:", colX[7] + 5, totalY + 5);

    doc.fillColor("#ec2125").text(`${totalAmount}`, colX[8] + 5, totalY + 5, {
      width: colWidths[8] - 10,
      align: "right",
    });

    const termsY = totalY + 50;

    // Title with clickable link
    doc
      .fontSize(14)
      .fillColor("#ec2125")
      .text("Terms and Conditions", leftMargin, termsY);

    // Custom list rendering with 10px top & bottom spacing per item
    const terms = [
      "Tickets can only be cancelled up to 24 hours before the departure time.",
      "Seat bookings are confirmed only after successful payment.",
      "The company is not responsible for delays due to traffic or weather conditions.",
      "Please arrive at the boarding point at least 15 minutes before departure.",
      "No refund will be issued for no-shows or late arrivals.",
      "Ensure all personal belongings are safe; the company is not liable for lost items.",
      "Eating or smoking inside the bus is strictly prohibited.",
    ];

    let currentY = termsY + 25;
    doc.fontSize(10).fillColor("#000");

    terms.forEach((term, i) => {
      doc
        .circle(leftMargin + 4, currentY + 4, 2)
        .fill("#ec2125")
        .fillColor("#000")
        .text(term, leftMargin + 12, currentY, {
          width: contentWidth - 20,
        });

      currentY += doc.heightOfString(term, { width: contentWidth - 20 }) + 10;
    });

    doc
      .circle(leftMargin + 4, currentY + 4, 2)
      .fill("#ec2125")
      .fillColor("#000")
      .text(
        "Please visit our website for full terms and conditions.",
        leftMargin + 12,
        currentY,
        {
          width: contentWidth - 20,
          link: "https://yourwebsite.com/terms",
          underline: true,
        }
      );

    // Dashed line below terms
    doc
      .moveTo(leftMargin, currentY + 40)
      .lineTo(pageWidth - rightMargin, currentY + 40)
      .dash(3, { space: 4 })
      .stroke("#e89e25")
      .undash();

    const footerStartY = currentY + 50;

    doc
      .fontSize(12)
      .fillColor("#333")
      .text(
        "Thank you for booking your ticket with us! We wish you a pleasant journey.",
        leftMargin,
        footerStartY,
        { align: "center", width: contentWidth }
      )
      .fontSize(10)
      .fillColor("#777")
      .text(
        "© 2025 Temple Tourism. All rights reserved.",
        leftMargin,
        footerStartY + 20,
        { align: "center", width: contentWidth }
      );

    doc.end();
  });
};

exports.getBooking = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }
    const getBooking = await Booking.findOne({ date });

    if (!getBooking) {
      return res.status(200).json({ booking: [] });
    }

    return res.status(200).json({
      booking: getBooking,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.otp = async (req, res) => {
  //console.log("otp cancel");

  const { to, message } = req.body;

  if (!to || !message) {
    return res
      .status(400)
      .json({ error: "Mobile number and message are required." });
  }
};

exports.unlockSeats = async (req, res) => {
  try {
    const { date, seatIds } = req.body;

    console.log(seatIds)

    const bookingDoc = await Bookseat.findOne({ date });
    const bookingsSeat=await Booking.findOne({date})
    if (!bookingDoc || !bookingsSeat)
      return res.status(404).json({ message: "No booking doc found" });

    // Remove seats with status "locked" and matching IDs
    bookingDoc.bookings = bookingDoc.bookings.filter(
      (b) => !(seatIds.includes(b.id) && b.status === "locked")
    );



    await bookingDoc.save();

    bookingsSeat.bookings=bookingsSeat.bookings.filter((b)=>!(seatIds.includes(b.id) && b.bookingStatus === "locked"))
    await bookingsSeat.save()

    console.log("filter",bookingsSeat.bookings.filter((b)=>!(seatIds.includes(b.id) && b.bookingStatus === "locked")))

    console.log("BookingSEAT",bookingsSeat.bookings)
    res.status(200).json({ message: "Seats unlocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
