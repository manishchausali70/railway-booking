const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

// Route to get real-time tracking information for a specific train
router.get('/track/:trainId', trackingController.trackTrain);

// Route to get the status of all trains
router.get('/status', trackingController.getAllTrainStatuses);

module.exports = router;