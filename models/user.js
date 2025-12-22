const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // This ensures no two users have the same email
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user', // Default role is 'user', can be changed to 'admin' manually later
    enum: ['user', 'admin'] // Only allow these two values
  }
}, { timestamps: true }); // This automatically adds 'createdAt' and 'updatedAt'

// We need to export this model so we can use it in other files
module.exports = mongoose.model('User', userSchema);