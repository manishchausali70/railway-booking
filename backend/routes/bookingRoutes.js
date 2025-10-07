const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to create a new booking
router.post('/book', bookingController.createBooking);

// Route to cancel a booking
router.delete('/cancel/:bookingId', bookingController.cancelBooking);

// Route to update a booking
router.put('/update/:bookingId', bookingController.updateBooking);

// Route to get booking details
router.get('/:bookingId', bookingController.getBookingDetails);

module.exports = router;