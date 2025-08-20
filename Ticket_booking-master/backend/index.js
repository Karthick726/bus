const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
require("./Controller/cronExpires");

const loginRoute = require("./Route/loginRoute");
const adminadded = require("./Route/AdminContactRouter");
const logoutRoute = require("./Route/logoutRoute");
const PackageRoute = require("./Route/PackageRoute");
const busRoute = require("./Route/BusRoute");
const razorpayRoute = require("./Route/RazorpayRoute");
const bookingRoute = require("./Route/BookinRoute");
const userRoute = require("./Route/userContactRoute");
const infoRoute = require("./Route/InfoRoute");
const cancelRoute = require("./Route/cancelRoute")
const expireRoute = require("./Route/expireRoute")
const OfferRoute = require("./Route/OfferRoute")

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ticket-booking-frontend-eta.vercel.app",
    "https://bus-frontend-two.vercel.app",
  ],

  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Ticket Booking Website");
});
app.use("/admin", loginRoute);
app.use("/contact", adminadded);
app.use("/admins", logoutRoute);
app.use("/package", PackageRoute);
app.use("/bus", busRoute);
app.use("/razorpay", razorpayRoute);
app.use("/booking", bookingRoute);
app.use("/usercontact", userRoute);
app.use("/info", infoRoute);
app.use("/cancel",cancelRoute);
app.use("/expires",expireRoute);
app.use("/offer",OfferRoute);

// MongoDB connection
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
