// Mongoose connection
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/railway_booking';

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('[DB] Connected to MongoDB');
}).catch((err) => {
    console.error('[DB] MongoDB connection error:', err.message);
});

module.exports = mongoose;