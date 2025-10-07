const db = require('../db/connection');

// Controller to get real-time tracking information for a specific train
exports.trackTrain = (req, res) => {
    const trainId = req.params.trainId;
    const query = 'SELECT * FROM train WHERE train_id = ?';

    db.query(query, [trainId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(results[0]);
    });
};

// Controller to get all trains with their current status
exports.getAllTrainStatuses = (req, res) => {
    const query = 'SELECT train_id, train_name, status FROM train';

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
};

// Controller to update the status of a train (if needed in other routes)
exports.updateTrainStatus = (req, res) => {
    const trainId = req.params.trainId;
    const { status } = req.body;
    const query = 'UPDATE train SET status = ? WHERE train_id = ?';

    db.query(query, [status, trainId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database update failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json({ message: 'Train status updated successfully' });
    });
};