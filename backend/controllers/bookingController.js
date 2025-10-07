const db = require('../db/connection');

// Create a new booking
exports.createBooking = (req, res) => {
    const { userId, trainId, seatNumber } = req.body;
    const bookingStatus = 'confirmed';

    const query = 'INSERT INTO bookings (user_id, train_id, seat_number, status) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, trainId, seatNumber, bookingStatus], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error creating booking' });
        }
        res.status(201).json({ message: 'Booking created successfully', bookingId: results.insertId });
    });
};

// Update an existing booking
exports.updateBooking = (req, res) => {
    const { bookingId, seatNumber } = req.body;

    const query = 'UPDATE bookings SET seat_number = ? WHERE id = ?';
    db.query(query, [seatNumber, bookingId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error updating booking' });
        }
        res.status(200).json({ message: 'Booking updated successfully' });
    });
};

// Cancel a booking
exports.cancelBooking = (req, res) => {
    const { bookingId } = req.params;

    const query = 'DELETE FROM bookings WHERE id = ?';
    db.query(query, [bookingId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error canceling booking' });
        }
        res.status(200).json({ message: 'Booking canceled successfully' });
    });
};

// Get booking details
exports.getBookingDetails = (req, res) => {
    const { bookingId } = req.params;

    const query = 'SELECT * FROM bookings WHERE id = ?';
    db.query(query, [bookingId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error fetching booking details' });
        }
        res.status(200).json(results[0]);
    });
};