const axios = require("axios");

const cancelSms = async function (to, message) {
  const url = "https://api.smartping.ai/fe/api/v1/multiSend";

  const params = {
    username: "templetourisum.trans",
    password: "G6WBR",
    unicode: true,
    from: "NVAGRA",
    to: Number(to),
    dltPrincipalEntityId: "1701163785527538122",
    dltContentId: "1407174858414322441",
    text: `Hello! To cancel your TempleTourism ticket, enter OTP ${message}.This code is private– please don't share it with anyone.`,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data
    // return res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
    // return res.status(500).json({ error: "Failed to send SMS" });
  }
};

module.exports = cancelSms;
