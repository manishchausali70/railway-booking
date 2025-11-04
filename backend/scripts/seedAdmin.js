// Seed an admin user: name=root, email=root@local, password=123456
const bcrypt = require('bcryptjs');
require('dotenv').config();
const mongoose = require('../db/connection');
const { User } = require('../models');

(async () => {
  try {
    const name = process.env.ADMIN_NAME || 'root';
    const email = (process.env.ADMIN_EMAIL || 'root@local').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || '123456';

    let user = await User.findOne({ email });
    if (user) {
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log(`[seed] Promoted existing user ${email} to admin`);
      } else {
        console.log(`[seed] Admin already exists: ${email}`);
      }
    } else {
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hash, role: 'admin', username: name });
      console.log(`[seed] Created admin user: ${email} / password=${password}`);
    }
  } catch (err) {
    console.error('[seed] Error seeding admin:', err);
    process.exitCode = 1;
  } finally {
    // Close connection to exit
    setTimeout(() => mongoose.connection.close(), 250);
  }
})();
