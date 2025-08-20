const instance = require("../razorpay/Razorpay");
const Bookseat = require("../Schema/BookSeatSchema");

const Booking = require("../Schema/BookingSchema");

// exports.processPayment = async (req, res) => {
//   try {
//     const { totalPrice, BookingDetails, date } = req.body;

//     console.log(req.body);

//     const newSeatIds = BookingDetails.map((seat) => seat.id);
//     const bookingSeat = await Bookseat.findOne({ date });

//     if (bookingSeat) {
//       const existingIds = bookingSeat.bookings.map((b) => b.id);
//       const duplicateIds = newSeatIds.filter((id) => existingIds.includes(id));

//       if (duplicateIds.length > 0) {
//         const duplicateNumbers = BookingDetails
//           .filter((seat) => duplicateIds.includes(seat.id))
//           .map((seat) => seat.number);

//         return res.status(400).json({
//           message: `These seat numbers are already booked: ${duplicateNumbers.join(", ")}`,
//         });
//       }
//     }
//     const option = {
//       amount: Number(totalPrice * 100),
//       currency: "INR",
//     };

//     const order = await instance.orders.create(option);

//     res.status(200).json({
//       sucess: true,
//       order,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };
// const instance = require("../razorpay/Razorpay");
// const Bookseat = require("../Schema/BookSeatSchema");

exports.processPayment = async (req, res) => {
  try {
    const { totalPrice, BookingDetails, date } = req.body;

    const newSeatIds = BookingDetails.map((seat) => seat);
    const now = new Date();
    const expiryTime = 20 * 60 * 1000; // 20 minutes

    let bookingSeat = await Bookseat.findOne({ date });
    let bookingSession = await Booking.findOne({ date });

    if (!bookingSeat || !bookingSession) {
      // Create new doc if not exists
      bookingSeat = await Bookseat.create({ date, bookings: [] });
      bookingSession = await Booking.create({ date, bookings: [] });
    }

    // Remove expired locked seats
    bookingSeat.bookings = bookingSeat.bookings.filter((seat) => {
      return !(seat.status === "locked" && now - seat.lockedAt > expiryTime);
    });

    bookingSession.bookings = bookingSession.bookings.filter((seat) => {
      return !(seat.status === "locked" && now - seat.lockedAt > expiryTime);
    });

    // Check if any selected seat is already booked or locked
    const conflictSeats = bookingSeat.bookings.filter(
      (seat) =>
        newSeatIds.includes(seat.id) &&
        (seat.status === "booked" ||
          (seat.status === "locked" && now - seat.lockedAt <= expiryTime))
    );

    const conflictSeatsSession = bookingSession.bookings.filter(
      (seat) =>
        newSeatIds.includes(seat.id) &&
        (seat.status === "booked" ||
          (seat.status === "locked" && now - seat.lockedAt <= expiryTime))
    );

    if (conflictSeatsSession.length > 0) {
      const conflictNumbers = BookingDetails.filter((s) =>
        conflictSeatsSession.some((c) => c.id === s.id)
      ).map((s) => s.number);

      return res.status(400).json({
        message: `These seat numbers are already booked or locked: ${conflictNumbers.join(
          ", "
        )}`,
      });
    }

    if (conflictSeats.length > 0) {
      const conflictNumbers = BookingDetails.filter((s) =>
        conflictSeats.some((c) => c.id === s.id)
      ).map((s) => s.number);

      return res.status(400).json({
        message: `These seat numbers are already booked or locked: ${conflictNumbers.join(
          ", "
        )}`,
      });
    }

    // Lock the selected seats
    const lockedSeats = newSeatIds.map((seat) => ({
      id:seat.id,
      status: "locked",
      lockedAt: now,
      createdAt: now,
    }));

    bookingSeat.bookings.push(...lockedSeats);
    await bookingSeat.save();

    // Create Razorpay order
    const option = {
      amount: Number(totalPrice * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(option);

    const lockedSessionSeats = newSeatIds.map((seat) => ({
      ...seat,
      status: "locked",
      order_id: order.id,
     
    }));

    bookingSession.bookings.push(...lockedSessionSeats);
    await bookingSession.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
