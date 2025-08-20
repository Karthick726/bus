const axios = require("axios");

const reminderSms = async function (date,row,number,mobileNumber) {

    console.log('reminderData',date,row,number,mobileNumber);
    
  const url = "https://api.smartping.ai/fe/api/v1/multiSend";

  const params = {
    username: "templetourisum.trans",
    password: "G6WBR",
    unicode: true,
    from: "NVAGRA",
    to: Number(mobileNumber),
    dltPrincipalEntityId: "1701163785527538122",
    dltContentId: "1407174858712103502",
    text: `TempleTourism Reminder: Your group pilgrimage via Navagraha package is on

date :${date}
time :5.30 AM
Seats: Row ${row} - Seat ${number}
Boarding: NBS Tower Near New Bus stand kumbakonam
Driver: 9566744457

Please arrive 15 mins early.
Wishing you a blessed and peaceful journey!`,
  };

  try {
    const response = await axios.get(url, { params });
    console.log("smsresponse", response.data);
    return response.data;
  } catch (error) {
    console.error("smsError", error);
  }
};

module.exports = reminderSms;
