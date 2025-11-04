const express = require('express');
const router = express.Router();
const { Train } = require('../models');

// Public search: /api/trains/search?from=A&to=B
router.get('/search', async (req, res) => {
  try {
    const { from, to } = req.query;
    const q = {};
    if (from) q.from = new RegExp(`^${from}$`, 'i');
    if (to) q.to = new RegExp(`^${to}$`, 'i');
    const trains = await Train.find(q).sort({ trainNumber: 1 });
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
  } catch (err) {
    console.error('trains search error:', err);
    return res.status(500).json({ message: 'Failed to search trains' });
  }
});

module.exports = router;
