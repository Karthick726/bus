const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  packageDay: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },

  description: [],
  Place: [
    {
      value: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("package", packageSchema);
