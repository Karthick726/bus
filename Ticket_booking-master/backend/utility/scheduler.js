const bookingSchema = require("../Schema/BookingSchema");
const reminderSms = require("../utility/reminderSms");

module.exports = async (req, res) => {
  try {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    const nextDay = today.toLocaleDateString("en-GB");

    const booking = await bookingSchema.find({ date: nextDay });

    console.log(booking);
    if (booking.length === 0) {
      console.log("no booking");
      return;
    }

    const reminderTasks = booking[0]?.bookings.filter((value)=>value.bookingStatus === "Booked").map((each) =>
      reminderSms(nextDay, each.row, each.number, each.mobileNumber)
    );
    await Promise.all(reminderTasks);
    // res.status(200).json({ message: "scheduler function called" });
    console.log("Reminders sent successfully.");
  } catch (error) {
    console.log(error);
  }
};
