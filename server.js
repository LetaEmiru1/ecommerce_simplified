const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1. Load Environment Variables (JWT Secret, DB URL)
dotenv.config();

// 2. Initialize the App
const app = express();

// 3. Middleware
// This allows the app to accept JSON data in req.body
app.use(express.json());

// 4. Database Connection
// Replace process.env.MONGO_URI with your actual connection string 
// if you haven't put it in a .env file yet.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// 5. Define Routes
// This tells the server: "If a request starts with /api/auth, go look in the auth.js file"
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
// We will uncomment this next line once you create the orders.js file!
// app.use('/api/orders', require('./routes/orders'));

// 6. Start the Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));