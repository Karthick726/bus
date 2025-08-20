const BusLayout = require("../Schema/BusLayoutSchema");
const BusSchedule = require("../Schema/BusSchudleSchema");
const Bookseat = require("../Schema/BookSeatSchema");
const mongoose = require("mongoose");

exports.addLayout = async (req, res) => {
  try {
    const { layout, rows, seats } = req.body;
    const newLayout = new BusLayout({ layout, rows, seats });
    await newLayout.save();
    res.status(201).json(newLayout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDateLayout = async (req, res) => {
  try {
    const { date } = req.query;

    console.log(date);

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    const bookingSeat = await Bookseat.findOne({ date });

    const schedule = await BusSchedule.findOne({ date });

    let busId;

    if (schedule && schedule.busId) {
      busId = schedule.busId;
    } else {
      busId = new mongoose.Types.ObjectId("6819d38acc13411e292deaf1");
    }

    const layoutResult = await BusLayout.findOne({ _id: busId });

    console.log(layoutResult);

    res
      .status(200)
      .json({ layoutResult, date, bookingSeat: bookingSeat?.bookings || [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDateLayout = async (req, res) => {
  try {
    const { date, busId } = req.body;

    if (!date || !busId) {
      return res.status(400).json({
        message: "Date and bus ID is required",
      });
    }

    const dateSeatBooking=await Bookseat.findOne({date});

    if(dateSeatBooking){
        return res.status(400).json({
        message: "Already Seat are booked for this date",
      });
    }

    const saveLayout = await BusSchedule.findOne({ date });

    if (saveLayout) {
      saveLayout.date = date;
      saveLayout.busId = busId;

      await saveLayout.save();

      return res.status(200).json({
        message: "update sucessfully",
      });
    } else {
      const saveLayout = new BusSchedule({
        date,
        busId,
      });

      await saveLayout.save();

      return res.status(200).json({
        message: "update sucessfully",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
