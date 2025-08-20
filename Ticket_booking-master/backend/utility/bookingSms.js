const axios = require("axios");

const bookingSms = async function (date, booking) {
  const url = "https://api.smartping.ai/fe/api/v1/multiSend";

  const params = {
    username: "templetourisum.trans",
    password: "G6WBR",
    unicode: true,
    from: "NVAGRA",
    to: Number(booking.mobileNumber),
    dltPrincipalEntityId: "1701163785527538122",
    dltContentId: "1407174858407322381",
    text: `Temple Tourism: Your Navagraha Temple Tour is confirmed!

PNR : ${booking.PNR}
Passenger: ${booking.name}
Seat No : Row ${booking.row} - Seat ${booking.number}
Date : ${date}
Time : 5.30 AM
From : NBS Tower Near New Bus stand kumbakonam
To : Navagraha Temples
Contact : 9566744457
Happy journey!`,
  };

  try {
    const response = await axios.get(url, { params });
    console.log("smsresponse", response.data);
    return response.data;
  } catch (error) {
    console.error("smsError", error);
  }
};

module.exports = bookingSms;
