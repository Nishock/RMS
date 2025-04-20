const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Validation middleware
const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9@._-]+$/)
    .withMessage('Username can only contain letters, numbers, @, dots, underscores, and hyphens'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('role')
    .isIn(['admin', 'teacher', 'student'])
    .withMessage('Invalid role'),
  body('rollNumber')
    .if(body('role').equals('student'))
    .notEmpty()
    .withMessage('Roll number is required for students'),
  body('teacherId')
    .if(body('role').equals('teacher'))
    .notEmpty()
    .withMessage('Teacher ID is required for teachers'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role')
    .isIn(['admin', 'teacher', 'student'])
    .withMessage('Invalid role'),
  body('teacherId')
    .if(body('role').equals('teacher'))
    .notEmpty()
    .withMessage('Teacher ID is required for teachers'),
  body('rollNumber')
    .if(body('role').equals('student'))
    .notEmpty()
    .withMessage('Roll number is required for students'),
];

// Debug middleware to log all requests
router.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log('Request body:', req.body);
    next();
});

// Sign up route
router.post('/signup', validateSignup, async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { email, username, role } = req.body;

    // Check if user already exists with email
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Check if username is already taken (case-insensitive)
    user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (user) {
      console.log('Username already taken:', username);
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create new user with lowercase username
    const newUser = new User({
      ...req.body,
      username: username.toLowerCase()
    });
    
    await newUser.save();
    console.log('New user created:', newUser.email);

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Verify token route
router.get('/verify', auth, async (req, res) => {
  try {
    // Remove password from response
    const userResponse = req.user.toObject();
    delete userResponse.password;

    res.json({
      token: req.token,
      user: userResponse
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 