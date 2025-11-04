// Ensure DB connection is established (db/connection.js connects on require)
require('../db/connection');
const User = require('./user');
const Train = require('./train');
const Schedule = require('./schedule');
const Booking = require('./booking');

module.exports = { User, Train, Schedule, Booking };