const mysql = require('mysql');
const db = require('../db/connection');

const Booking = {
    createBooking: (userId, trainId, seatNumber, callback) => {
        const bookingStatus = 'confirmed';
        const query = 'INSERT INTO bookings (user_id, train_id, seat_number, booking_status) VALUES (?, ?, ?, ?)';
        db.query(query, [userId, trainId, seatNumber, bookingStatus], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results.insertId);
        });
    },

    cancelBooking: (bookingId, callback) => {
        const query = 'UPDATE bookings SET booking_status = ? WHERE id = ?';
        db.query(query, ['canceled', bookingId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results.affectedRows);
        });
    },

    getBooking: (bookingId, callback) => {
        const query = 'SELECT * FROM bookings WHERE id = ?';
        db.query(query, [bookingId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    },

    getUserBookings: (userId, callback) => {
        const query = 'SELECT * FROM bookings WHERE user_id = ?';
        db.query(query, [userId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
};

module.exports = Booking;