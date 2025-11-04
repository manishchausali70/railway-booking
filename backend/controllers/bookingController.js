const { Booking, Train } = require('../models');
const { randomPNR } = require('../utils/pnr');

// Create a new booking: user from auth, train by ID or number, include passenger + date
exports.createBooking = async (req, res) => {
    try {
        const authUserId = req.user?.id;
        const { trainId, trainNumber, passengerName, age, date } = req.body;
        if (!authUserId) return res.status(401).json({ message: 'Unauthorized' });
        if (!passengerName || age == null || !date || (!trainId && !trainNumber)) {
            return res.status(400).json({ message: 'passengerName, age, date and trainId or trainNumber are required' });
        }

        let resolvedTrainId = trainId;
        if (!resolvedTrainId && trainNumber) {
            const train = await Train.findOne({ trainNumber });
            if (!train) return res.status(404).json({ message: 'Train not found for the given trainNumber' });
            resolvedTrainId = train._id;
        }

        const booking = await Booking.create({
            userId: authUserId,
            trainId: resolvedTrainId,
            passengerName,
            age,
            date: new Date(date),
            bookingStatus: 'confirmed',
            pnr: randomPNR()
        });

        const populated = await booking.populate([
          { path: 'trainId', select: 'trainName trainNumber from to departure arrival fare' }
        ]);

        return res.status(201).json({
            message: 'Ticket Booked Successfully',
            booking: {
              bookingId: booking._id,
              pnr: booking.pnr,
              passengerName: booking.passengerName,
              age: booking.age,
              date: booking.date,
              train: populated.trainId ? {
                id: populated.trainId._id,
                trainName: populated.trainId.trainName,
                trainNumber: populated.trainId.trainNumber,
                from: populated.trainId.from,
                to: populated.trainId.to,
                departure: populated.trainId.departure,
                arrival: populated.trainId.arrival,
                fare: populated.trainId.fare
              } : null
            }
        });
    } catch (error) {
        console.error('createBooking error:', error);
        return res.status(500).json({ message: 'Error creating booking' });
    }
};

// Update an existing booking
exports.updateBooking = async (req, res) => {
    try {
    const { bookingId } = req.params;
    const { seatNumber } = req.body;
    if (!seatNumber) return res.status(400).json({ message: 'seatNumber is required' });

    const result = await Booking.updateOne({ _id: bookingId }, { $set: { seatNumber } });
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Booking not found' });
    return res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error('updateBooking error:', error);
        return res.status(500).json({ message: 'Error updating booking' });
    }
};

// Cancel a booking (soft cancel by setting status)
exports.cancelBooking = async (req, res) => {
    try {
    const { bookingId } = req.params;
    const result = await Booking.updateOne({ _id: bookingId }, { $set: { bookingStatus: 'canceled' } });
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Booking not found' });
        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('cancelBooking error:', error);
        return res.status(500).json({ message: 'Error canceling booking' });
    }
};

// Get booking details
exports.getBookingDetails = async (req, res) => {
    try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate('trainId', 'trainName trainNumber from to departure arrival fare');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        return res.status(200).json(booking);
    } catch (error) {
        console.error('getBookingDetails error:', error);
        return res.status(500).json({ message: 'Error fetching booking details' });
    }
};

// Lookup by PNR
exports.getByPNR = async (req, res) => {
    try {
    const { pnr } = req.params;
        const booking = await Booking.findOne({ pnr });
        if (!booking) return res.status(404).json({ message: 'PNR not found' });
        return res.json({ pnr: booking.pnr, status: booking.bookingStatus, booking });
    } catch (err) {
        console.error('getByPNR error:', err);
        return res.status(500).json({ message: 'Error fetching PNR' });
    }
};

// List bookings for the current user
exports.getMyBookings = async (req, res) => {
    try {
        const authUserId = req.user?.id;
        if (!authUserId) return res.status(401).json({ message: 'Unauthorized' });
        const bookings = await Booking.find({ userId: authUserId })
            .sort({ createdAt: -1 })
            .populate('trainId', 'trainName trainNumber from to departure arrival fare');
        const out = bookings.map(b => ({
            bookingId: b._id,
            passengerName: b.passengerName,
            age: b.age,
            date: b.date,
            bookingStatus: b.bookingStatus,
            pnr: b.pnr,
            train: b.trainId ? {
                id: b.trainId._id,
                trainName: b.trainId.trainName,
                trainNumber: b.trainId.trainNumber,
                from: b.trainId.from,
                to: b.trainId.to,
                departure: b.trainId.departure,
                arrival: b.trainId.arrival,
                fare: b.trainId.fare
            } : null
        }));
        return res.json(out);
    } catch (err) {
        console.error('getMyBookings error:', err);
        return res.status(500).json({ message: 'Error fetching bookings' });
    }
};