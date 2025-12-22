const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Tool for hashing passwords
const User = require('../models/User'); // Import the Schema we made in Step 3

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    // 1. Destructure the data coming from the user (frontend)
    // The data is stored in 'req.body'
    const { username, email, password } = req.body;

    // 2. CHECK IF USER EXISTS
    // Use the User model to look for a user with this email.
    // Syntax hint: await User.findOne({ field: value })
    const userExists = await User.findOne({ /* ??? FILL THIS IN ??? */ });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. HASH THE PASSWORD
    // We never save plain text passwords.
    // Use bcrypt.genSalt(10) to create a salt.
    // Use bcrypt.hash(password, salt) to create the hash.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(/* ??? FILL THIS IN ??? */ salt);

    // 4. CREATE THE USER
    // Create a new user instance using the Model
    const newUser = new User({
      username: username,
      email: email,
      password: /* ??? WHICH VARIABLE GOES HERE? ??? */
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