const { Train, Schedule, Booking, User } = require('../models');

exports.addTrain = async (req, res) => {
    try {
        const { trainNumber, trainName, from, to, departure, arrival, fare } = req.body;
        if (!trainNumber || !trainName || !from || !to || !departure || !arrival || fare == null) {
            return res.status(400).json({ message: 'trainNumber, trainName, from, to, departure, arrival, fare are required' });
        }
        const train = await Train.create({ trainNumber, trainName, from, to, departure, arrival, fare });
        return res.status(201).json({ message: 'Train added', train: { trainId: train._id, trainNumber: train.trainNumber, trainName: train.trainName, from: train.from, to: train.to, departure: train.departure, arrival: train.arrival, fare: train.fare } });
    } catch (error) {
        console.error('addTrain error:', error);
        return res.status(500).json({ message: 'Failed to add train' });
    }
};

exports.removeTrain = async (req, res) => {
    try {
    const { trainId } = req.params;
    const result = await Train.deleteOne({ _id: trainId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Train not found' });
        return res.json({ message: 'Train removed' });
    } catch (error) {
        console.error('removeTrain error:', error);
        return res.status(500).json({ message: 'Failed to remove train' });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
    const { trainId } = req.params;
    const { departureTime, arrivalTime, routeDetails } = req.body;
        if (!departureTime || !arrivalTime) return res.status(400).json({ message: 'departureTime and arrivalTime are required' });
    const schedule = await Schedule.create({ trainId, departureTime, arrivalTime, routeDetails });
    return res.json({ message: 'Schedule updated', schedule: { scheduleId: schedule._id, ...schedule.toObject() } });
    } catch (error) {
        console.error('updateSchedule error:', error);
        return res.status(500).json({ message: 'Failed to update schedule' });
    }
};

exports.getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find({}).sort({ trainNumber: 1 });
        return res.json(trains.map(t => ({
            trainId: t._id,
            trainNumber: t.trainNumber,
            trainName: t.trainName,
            from: t.from,
            to: t.to,
            departure: t.departure,
            arrival: t.arrival,
            fare: t.fare
        })));
    } catch (error) {
        console.error('getAllTrains error:', error);
        return res.status(500).json({ message: 'Failed to fetch trains' });
    }
};

exports.getTrainById = async (req, res) => {
    try {
    const { trainId } = req.params;
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    const schedules = await Schedule.find({ trainId }).sort({ departureTime: -1 });
    return res.json({ train: { trainId: train._id, trainNumber: train.trainNumber, trainName: train.trainName, from: train.from, to: train.to, departure: train.departure, arrival: train.arrival, fare: train.fare }, schedules });
    } catch (error) {
        console.error('getTrainById error:', error);
        return res.status(500).json({ message: 'Failed to fetch train' });
    }
};

// View passengers data (bookings joined with users and trains)
exports.getPassengers = async (req, res) => {
    try {
                const bookings = await Booking.find({})
                    .populate('userId', 'name email')
                    .populate('trainId', 'trainNumber trainName from to departure arrival fare')
          .sort({ createdAt: -1 });
        // Map to export-friendly JSON
                const out = bookings.map(b => ({
                    bookingId: b._id,
                    passengerName: b.passengerName,
                    age: b.age,
                    date: b.date,
                    bookingStatus: b.bookingStatus,
                    createdAt: b.createdAt,
                    user: b.userId ? { id: b.userId._id, name: b.userId.name, email: b.userId.email } : null,
                    train: b.trainId ? { id: b.trainId._id, trainNumber: b.trainId.trainNumber, trainName: b.trainId.trainName, from: b.trainId.from, to: b.trainId.to, departure: b.trainId.departure, arrival: b.trainId.arrival, fare: b.trainId.fare } : null
                }));
        return res.json(out);
    } catch (err) {
        console.error('getPassengers error:', err);
        return res.status(500).json({ message: 'Failed to fetch passengers' });
    }
};