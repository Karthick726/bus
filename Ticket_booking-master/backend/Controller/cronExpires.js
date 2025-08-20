const cron = require("node-cron");
const Bookseat = require("../Schema/BookSeatSchema"); // Adjust path as needed

const EXPIRY_TIME_MS = 20 * 60 * 1000; // 20 minutes

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
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
  }
});