function randomPNR() {
  // Simple 10-12 alphanumeric PNR generator
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 10; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

module.exports = { randomPNR };
