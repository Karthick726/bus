const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, 
    auth: {
      user: "malapuram1823@gmail.com",
      pass: "okhu rmmg anbu achq",
    },
  });
  
module.exports=transporter;