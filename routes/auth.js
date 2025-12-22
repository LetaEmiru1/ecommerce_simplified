const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Tool for hashing passwords
const User = require('../models/User'); // Import the Schema
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    // 1. Destructure the data coming from the user (frontend)
    const { username, email, password } = req.body;

    // 2. CHECK IF USER EXISTS
    const userExists = await User.findOne({ email: email});

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // 4. CREATE THE USER
    // Create a new user instance using the Model
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    // 5. SAVE TO DB
    await newUser.save();

    // 6. RESPOND TO CLIENT
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;