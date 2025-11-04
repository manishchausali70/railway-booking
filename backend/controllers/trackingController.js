const { Train, Schedule } = require('../models');

// Get tracking info for a specific train (basic info + latest schedule if any)
exports.trackTrain = async (req, res) => {
    try {
        const trainId = req.params.trainId;
        const train = await Train.findById(trainId);
        if (!train) return res.status(404).json({ message: 'Train not found' });

        const latestSchedule = await Schedule.findOne({
            trainId
        }).sort({ departureTime: -1 });

        return res.json({
            train: {
                trainId: train._id,
                trainNumber: train.trainNumber,
                trainName: train.trainName
            },
            schedule: latestSchedule || null
        });
    } catch (error) {
        console.error('trackTrain error:', error);
        return res.status(500).json({ error: 'Failed to fetch tracking info' });
    }
};

// Get all trains (no status column in schema, so list basic info)
exports.getAllTrainStatuses = async (req, res) => {
    try {
    const trains = await Train.find({}, { trainNumber: 1, trainName: 1 }).sort({ trainNumber: 1 });
    return res.json(trains.map(t => ({ trainId: t._id, trainNumber: t.trainNumber, trainName: t.trainName })));
    } catch (error) {
        console.error('getAllTrainStatuses error:', error);
        return res.status(500).json({ error: 'Failed to fetch trains' });
    }
};

// Not implemented: schema has no status column
exports.updateTrainStatus = (req, res) => {
    return res.status(400).json({ message: 'Train status not supported by current schema' });
};