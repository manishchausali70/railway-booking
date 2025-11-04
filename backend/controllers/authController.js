const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'dev_access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_secret';
const ACCESS_TTL = process.env.ACCESS_TTL || '15m';
const REFRESH_TTL_MS = Number(process.env.REFRESH_TTL_MS || 7 * 24 * 60 * 60 * 1000); // 7 days

function signAccess(user) {
  return jwt.sign({ id: user._id.toString(), name: user.name, email: user.email, role: user.role }, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

function signRefresh(user) {
  return jwt.sign({ id: user._id.toString(), tokenUse: 'refresh' }, REFRESH_SECRET, { expiresIn: Math.floor(REFRESH_TTL_MS / 1000) });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password are required' });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hash, role: role === 'admin' ? 'admin' : 'user' });
    return res.status(201).json({ message: 'Registered successfully', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = (email || username || '').toString().trim();
    let user;
    if (identifier.includes('@')) {
      user = await User.findOne({ email: identifier.toLowerCase() });
    } else {
      // Backward-compat: allow login with username or name
      user = await User.findOne({ $or: [ { username: identifier }, { name: identifier } ] });
    }
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const access = signAccess(user);
    const refresh = signRefresh(user);
    res.cookie('refreshToken', refresh, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: REFRESH_TTL_MS,
      secure: false
    });
    return res.json({ message: 'Login successful', accessToken: access, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });
    let payload;
    try {
      payload = jwt.verify(token, REFRESH_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    const access = signAccess(user);
    return res.json({ accessToken: access });
  } catch (err) {
    console.error('refresh error:', err);
    return res.status(500).json({ message: 'Refresh failed' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax', secure: false });
  return res.json({ message: 'Logged out' });
};
