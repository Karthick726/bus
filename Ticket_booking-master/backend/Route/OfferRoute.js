const express = require("express");
const router = express.Router();
const offer=require("../Controller/OfferController")
const VerifyToken = require("./VerifyToken/VerifyToken");
const upload=require("../cloundinary/upload")

router.post("/add-offer", VerifyToken,upload.fields([{name:'image',maxCount:1}]),offer.addOffer);

// router.post("/update-service", VerifyToken,upload.fields([{name:'image',maxCount:1}]),service.updateService);

router.post("/delete-offer", VerifyToken,offer.deleteOffers);


router.get("/get-offer",offer.getOffers)


module.exports = router;
