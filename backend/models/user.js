const { Schema, model } = require('mongoose');

// Users: name, email, password (hashed), role (user/admin)
const UserSchema = new Schema({
  name: { type: String, required: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // Backward-compat fields (optional)
  username: { type: String, default: null },
  contactInfo: { type: String, default: null, maxlength: 100 }
}, { timestamps: true });

module.exports = model('User', UserSchema);