const express = require("express");
const router = express.Router();
const controller = require("../Controller/cancelController");
const rateLimit = require("express-rate-limit");

const otpVerificationLimiter = rateLimit({
  windowMs:  10000,
  max: 1,
  message: {
    status: 429,
    message: "Too many OTP cancel attempts. Please try again in a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


router.post("/ticket", otpVerificationLimiter,controller.cancelTicket);
router.post(
  "/otpVerification",
  otpVerificationLimiter,
  controller.otpVerification
);
router.post("/resetOTP", controller.resetOTP);

module.exports = router;
