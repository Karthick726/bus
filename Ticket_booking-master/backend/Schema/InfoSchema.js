const mongoose = require('mongoose');

const placeInfoSchema = new mongoose.Schema({
  place: String,
  info: String
});

const festivalInfoSchema = new mongoose.Schema({
  date: String,
  placeInfo: [placeInfoSchema]
}, { timestamps: true });

module.exports = mongoose.model('FestivalInfos', festivalInfoSchema);
