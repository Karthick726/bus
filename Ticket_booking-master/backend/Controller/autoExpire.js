const Bookseat = require("../Schema/BookSeatSchema"); // Adjust path as needed
const mongoose = require("mongoose");
const EXPIRY_TIME_MS = 20 * 60 * 1000; // 20 minutes

// Run every 5 minutes
const cleanExpiredSeats = async () =>   {
  try {
    const now = new Date();

    const allDocs = await Bookseat.find({});

    for (const doc of allDocs) {
      const originalLength = doc.bookings.length;

      // Remove expired locked seats
      doc.bookings = doc.bookings.filter(
        (seat) =>
          seat.status !== "locked" || now - new Date(seat.lockedAt) <= EXPIRY_TIME_MS
      );

      if (doc.bookings.length !== originalLength) {
        await doc.save();
        console.log(`Expired seats cleaned for date: ${doc.date}`);
      }
    }

  } catch (err) {
    console.error("Seat cleanup job failed:", err);
    throw err;
  }
};

const dbConnect =async()=>{
  const mongo_url =
    "mongodb+srv://karthickc726:MDiTXkn6p1RDTPx0@cluster0.jlqvlz4.mongodb.net/bus-ticket?retryWrites=true&w=majority&appName=Cluster0";
  
  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("db connect");
     
    })
    .catch((error) => {
      console.log("error:" + error);
    });
  
}


exports.handler=async(req, res) =>{
  



  try {
    await dbConnect();
    await cleanExpiredSeats();
    return res.status(200).json({ message: "Cleanup successful" });
  } catch (err) {
    console.error("Cleanup failed:", err);
    return res.status(500).json({ error: "Internal Server Error",errs:err });
  }
}


