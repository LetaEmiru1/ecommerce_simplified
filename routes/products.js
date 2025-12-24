const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Import the middleware you created in the previous step
// (Make sure the path matches where you saved that file)
const auth = require('../middleware/authMiddleware');

// @route   POST /api/products
// @desc    Create a product
// @access  Private (Login required)

router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, countInStock, imageUrl } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl,
      user: req.user.id // The middleware added 'req.user' to the request! //this points to the user that created the product
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/products
// @desc    Get all products
// @access  Public (Anyone can see products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;