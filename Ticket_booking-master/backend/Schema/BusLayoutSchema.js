const mongoose=require('mongoose')

const seatSchema = new mongoose.Schema({
  number: String,
  type: String,
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available'
  },
  row:{
    type:String
  }
});

const busLayoutSchema = new mongoose.Schema({
  layout: String, 
  rows: Number,
  seats: [seatSchema]
});


 const BusLayout = mongoose.model('busLayouts', busLayoutSchema);

 module.exports=BusLayout


