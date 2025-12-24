const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      totalPrice,
      user: req.user.id, // <--- This links the order to the logged-in user
      isPaid: true
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', auth, async (req, res) => {
  try {
    // Find orders where the 'user' field matches the logged-in user
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;