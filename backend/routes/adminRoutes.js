const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to add a new train
router.post('/addTrain', adminController.addTrain);

// Route to remove a train
router.delete('/removeTrain/:trainId', adminController.removeTrain);

// Route to update train schedule
router.put('/updateSchedule/:trainId', adminController.updateSchedule);

// Route to get all trains
router.get('/trains', adminController.getAllTrains);

// Route to get train details by ID
router.get('/train/:trainId', adminController.getTrainById);

module.exports = router;