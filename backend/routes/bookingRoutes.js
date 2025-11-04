const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuth } = require('../middleware/auth');

// Route to create a new booking (requires auth)
router.post('/book', isAuth, bookingController.createBooking);

// Route to cancel a booking
router.delete('/cancel/:bookingId', isAuth, bookingController.cancelBooking);

// Route to update a booking
router.put('/update/:bookingId', isAuth, bookingController.updateBooking);

// Search by PNR (keep before bookingId route)
router.get('/pnr/:pnr', bookingController.getByPNR);

// Route to get booking details
router.get('/:bookingId', isAuth, bookingController.getBookingDetails);

// Route to list current user's bookings
router.get('/', isAuth, bookingController.getMyBookings);

module.exports = router;