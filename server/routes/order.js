const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { user, products, totalAmount, paymentMethod, shippingAddress } = req.body;

    if (!user || !products || !totalAmount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Set initial status based on payment method
    let paymentStatus = 'Pending';
    let orderStatus = 'Processing';

    if (paymentMethod === 'razorpay') {
      paymentStatus = 'Paid';
      orderStatus = 'Confirmed';
    }

    const order = new Order({
      user,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus,
      shippingAddress,
      createdAt: new Date()
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// Get user orders
router.get('/my-orders', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID required'
      });
    }

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('products.product', 'name image price');

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

module.exports = router;
