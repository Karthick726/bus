const express = require("express");
const router = express.Router();
const VerifyToken = require("./VerifyToken/VerifyToken");
const package=require("../Controller/packageController")
const upload = require("../cloundinary/upload");


router.post('/add-package',VerifyToken,upload.any(),package.addPackage);

router.get("/get-package",package.getPackage)


router.post("/delete-package",VerifyToken,package.deletePackage)
router.post("/update-package",VerifyToken,package.updateVacation)

module.exports = router;