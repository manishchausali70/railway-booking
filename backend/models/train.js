const { Schema, model } = require('mongoose');

// Trains: trainName, trainNumber, from, to, departure, arrival, fare
const TrainSchema = new Schema({
  trainNumber: { type: String, required: true, unique: true, maxlength: 10 },
  trainName: { type: String, required: true, maxlength: 100 },
  from: { type: String, required: true, maxlength: 80 },
  to: { type: String, required: true, maxlength: 80 },
  departure: { type: String, required: true, maxlength: 10 }, // e.g., 09:30
  arrival: { type: String, required: true, maxlength: 10 },   // e.g., 17:45
  fare: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = model('Train', TrainSchema);