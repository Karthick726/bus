const express = require("express");
const router = express.Router();
const auto = require("../Controller/autoExpire");


router.post('/auto-expires',auto.handler);


module.exports = router;