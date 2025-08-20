const express = require("express");
const router = express.Router();
const info = require("../Controller/InfoController");
const VerifyToken = require("./VerifyToken/VerifyToken");

router.post("/add-info",VerifyToken, info.addFestivalInfo);

router.get("/get-info", info.getFestivalInfo);

router.get("/get-allinfo",VerifyToken, info.getAllInfo);

router.post("/delete-info", VerifyToken, info.deleteInfo); 

router.post("/update-info", VerifyToken, info.updateFestivalInfo); 

module.exports = router;