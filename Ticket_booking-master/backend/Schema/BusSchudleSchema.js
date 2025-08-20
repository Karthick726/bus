const mongoose=require('mongoose')

const BusScheduleSchema = new mongoose.Schema({
    busId: { type: mongoose.Schema.Types.ObjectId, ref: 'busLayouts' },
    date: String, 
  });


  module.exports = mongoose.model('busSchedules', BusScheduleSchema);