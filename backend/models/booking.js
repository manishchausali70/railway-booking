const { Schema, model, Types } = require('mongoose');

// Bookings: userId, trainId, passengerName, age, date, bookingTime (+ optional PNR/status)
const BookingSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  trainId: { type: Types.ObjectId, ref: 'Train', required: true },
  passengerName: { type: String, required: true, maxlength: 80 },
  age: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  bookingStatus: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' },
  // Optional legacy fields
  seatNumber: { type: String, default: null, maxlength: 10 },
  pnr: { type: String, default: null, unique: false }
}, { timestamps: true });

module.exports = model('Booking', BookingSchema);