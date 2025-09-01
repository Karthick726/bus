// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  id:{type: String},
  number: { type: String },
  row: { type: String },
  price: { type: Number, },

  name: { type: String,},
  age: { type: String,  },
  gender: { type: String,  },
  agegroup: { type: String,  },
  mobileNumber: { type: String,  },
  email: { type: String },
  proof: { type: String,  },
  proofIdNumber: { type: String,  },
  payment_id: { type: String,  },
  order_id: { type: String,  },
  PNR: { type: String,  },
  cancelTime:{
    type: Date,
  },
  cancelOTP:{type:Number},
  bookingStatus:{type:String,default:"locked"},
  cancelOtpCreatedAt:{type:Number},
  otpAttempt:{type:Number},
  createdAt: { type: Date, default: Date.now },
  lockedAt: { type: Date, default: Date.now },
  totalprice: { type: Number},
  totalTicket: { type: Number  },

});

const Booking=new mongoose.Schema({
    date:{
        type:String
    },
    bookings:[BookingSchema]
})

module.exports = mongoose.model("Booking", Booking);
