// server.js - Backend server for Daily Planner
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/daily-planner';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Planner Data Schema
const plannerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dailyData: { type: Map, of: Object, default: {} },
  weeklyData: { type: Map, of: Object, default: {} },
  heroImage: { type: String, default: null },
  lastUpdated: { type: Date, default: Date.now }
});

const Planner = mongoose.model('Planner', plannerSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.userId = user.userId;
    next();
  });
};

// Routes

// Register new user
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    // Create empty planner data for user
    const planner = new Planner({
      userId: user._id
    });
    await planner.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '30d' }
    );

    res.json({ token, email: user.email });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '30d' }
    );

    res.json({ token, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get planner data
app.get('/api/planner', authenticateToken, async (req, res) => {
  try {
    let planner = await Planner.findOne({ userId: req.userId });
    
    if (!planner) {
      // Create planner if it doesn't exist
      planner = new Planner({ userId: req.userId });
      await planner.save();
    }

    res.json({
      dailyData: Object.fromEntries(planner.dailyData || new Map()),
      weeklyData: Object.fromEntries(planner.weeklyData || new Map()),
      heroImage: planner.heroImage
    });
  } catch (error) {
    console.error('Get planner error:', error);
    res.status(500).json({ error: 'Failed to retrieve planner data' });
  }
});

// Update planner data
app.post('/api/planner', authenticateToken, async (req, res) => {
  try {
    const { dailyData, weeklyData, heroImage } = req.body;

    let planner = await Planner.findOne({ userId: req.userId });

    if (!planner) {
      planner = new Planner({ userId: req.userId });
    }

    if (dailyData !== undefined) {
      planner.dailyData = new Map(Object.entries(dailyData));
    }
    if (weeklyData !== undefined) {
      planner.weeklyData = new Map(Object.entries(weeklyData));
    }
    if (heroImage !== undefined) {
      planner.heroImage = heroImage;
    }

    planner.lastUpdated = new Date();
    await planner.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Update planner error:', error);
    res.status(500).json({ error: 'Failed to update planner data' });
  }
});

// Verify token (check if user is logged in)
app.get('/api/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ email: user.email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
