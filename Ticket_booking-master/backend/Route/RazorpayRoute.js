const express = require("express");
const { processPayment } = require("../Controller/RazorpayController");
const router = express.Router();

router.post("/payment",processPayment);



module.exports = router;