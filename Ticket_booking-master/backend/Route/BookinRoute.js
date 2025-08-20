const express = require("express");
const {
  createBooking,
  getBooking,
  otp,
  verifyPayment,
  unlockSeats,
} = require("../Controller/BookingController");
const VerifyToken = require("./VerifyToken/VerifyToken");
const router = express.Router();

router.post("/confirmbooking", createBooking);
router.post("/verify", verifyPayment);

router.post("/unlock", unlockSeats);

router.get("/get-booking", VerifyToken, getBooking);

router.post("/otp", otp);

module.exports = router;
