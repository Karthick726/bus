const schedularCb = require("../utility/scheduler");
const mongoose = require("mongoose");

async function mongoConnect() {
  const mongo_url =
    "mongodb+srv://karthickc726:MDiTXkn6p1RDTPx0@cluster0.jlqvlz4.mongodb.net/bus-ticket?retryWrites=true&w=majority&appName=Cluster0";

  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("db connect");
      const port = 8000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.log("error:" + error);
    });
}

export default async function handler(req, res) {
  try {
    await mongoConnect();
    await schedularCb();
    res.status(200).json({ message: "Reminder sent!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}