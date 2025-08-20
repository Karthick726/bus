const express = require("express");
const router = express.Router();

const webhooks=require("../Controller/BookingController")

router.post("/webhooks", webhooks.webhooks);


module.exports = router;