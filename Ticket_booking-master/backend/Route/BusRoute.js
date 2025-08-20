const express = require('express');
const router = express.Router();


const busLayout =require("../Controller/BusLayoutController");
const VerifyToken = require('./VerifyToken/VerifyToken');

router.post('/create-busLayout',VerifyToken,busLayout.addLayout );

router.post("/update-layoutdate",VerifyToken,busLayout.updateDateLayout)

router.get('/get-busLayout', busLayout.getDateLayout);


module.exports = router;