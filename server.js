const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { verifyToken } = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500', '*'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/firewood-business')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/business', require('./routes/business'));
app.use('/api/bills', verifyToken, require('./routes/bills'));
app.use('/api/cash', verifyToken, require('./routes/cash'));

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Serve login page
app.get('/', (req, res) => {
  res.sendFile('./login.html', { root: __dirname });
});

app.get('/login', (req, res) => {
  res.sendFile('./login.html', { root: __dirname });
});

// Serve dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🔥 Firewood Business Management System`);
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`✓ API: http://localhost:${PORT}/api\n`);
});

module.exports = app;
