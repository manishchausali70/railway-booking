const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuth, isAdmin } = require('../middleware/auth');

// Route to add a new train
router.post('/addTrain', isAuth, isAdmin, adminController.addTrain);

// Route to remove a train
router.delete('/removeTrain/:trainId', isAuth, isAdmin, adminController.removeTrain);

// Route to update train schedule
router.put('/updateSchedule/:trainId', isAuth, isAdmin, adminController.updateSchedule);

// Route to get all trains
router.get('/trains', adminController.getAllTrains);

// Route to get train details by ID
router.get('/train/:trainId', adminController.getTrainById);

// Passengers listing
router.get('/passengers', isAuth, isAdmin, adminController.getPassengers);

module.exports = router;