const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();
// Initialize DB (Mongo)
const mongoose = require('./db/connection');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const trainsRoutes = require('./routes/trainsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trains', trainsRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Wait for mongoose connection to be ready, then start server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

if (mongoose.connection && mongoose.connection.readyState === 1) {
    startServer();
} else {
    mongoose.connection.once('open', startServer);
    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
}