// Mongoose connection
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/railway_booking';

mongoose.set('strictQuery', false);

async function connect() {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            // SRV URIs negotiate TLS automatically; no need for deprecated options
        });
        console.log('[DB] Connected to MongoDB');
    } catch (err) {
        console.error('[DB] MongoDB connection error:', err.message);
        // Helpful guidance for common Atlas issues
        if ((err.message || '').toLowerCase().includes('whitelist') || (err.reason && err.reason.toString().includes('MongoServerSelectionError'))) {
            console.error('[DB] If you are using MongoDB Atlas:');
            console.error(' - Add your current IP to Network Access (or temporarily allow 0.0.0.0/0)');
            console.error(' - Confirm the database user and password in backend/.env are correct');
            console.error(' - Ensure outbound TLS/HTTPS is allowed by your firewall');
            }
            // Optional local fallback for development if Atlas is blocked
            if (process.env.DB_FALLBACK_LOCAL === '1') {
                const localUri = 'mongodb://127.0.0.1:27017/railway_booking';
                try {
                    console.warn('[DB] Attempting local MongoDB fallback at', localUri);
                    await mongoose.connect(localUri, { serverSelectionTimeoutMS: 5000 });
                    console.log('[DB] Connected to local MongoDB');
                    return;
                } catch (e2) {
                    console.error('[DB] Local MongoDB fallback failed:', e2.message);
                }
            }
    }
}

connect();

module.exports = mongoose;