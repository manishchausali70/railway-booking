const { Schema, model, Types } = require('mongoose');

const ScheduleSchema = new Schema({
  trainId: { type: Types.ObjectId, ref: 'Train', required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  routeDetails: { type: String }
}, { timestamps: true });

module.exports = model('Schedule', ScheduleSchema);