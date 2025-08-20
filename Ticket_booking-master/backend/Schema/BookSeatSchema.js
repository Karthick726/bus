// models/Booking.js
const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  date: {
    type: "string",
  },
  bookings: [
    {
      id: {
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
      status: { type: String, enum: ["available","locked", "booked"], default: "available" }, 
      lockedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("bookseats", Booking);
