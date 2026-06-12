const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid amount' 
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create payment order' 
    });
  }
});

// Verify Payment Signature
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details'
      });
    }

    // Generate signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Create order with payment details
    const order = new Order({
      user: orderData.user,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: 'razorpay',
      paymentStatus: 'completed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentDetails: orderData.paymentDetails
    });

    await order.save();

    res.json({
      success: true,
      message: 'Payment verified and order placed successfully',
      order
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
});

// Create Cash on Delivery Order
router.post('/cod-order', async (req, res) => {
  try {
    const {
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentDetails
    } = req.body;

    if (!user || !items || !totalAmount || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details'
      });
    }

    // Create COD order
    const order = new Order({
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'cod_pending',
      paymentDetails
    });

    await order.save();

    res.json({
      success: true,
      message: 'Cash on Delivery order placed successfully',
      order
    });
  } catch (error) {
    console.error('Error creating COD order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place COD order'
    });
  }
});

// Get Payment Methods
router.get('/methods', (req, res) => {
  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Online Payment',
      methods: [
        { type: 'upi', name: 'UPI', apps: ['GPay', 'PhonePe', 'Paytm'] },
        { type: 'credit_card', name: 'Credit Card' },
        { type: 'debit_card', name: 'Debit Card' },
        { type: 'net_banking', name: 'Net Banking' },
        { type: 'emi', name: 'EMI' },
        { type: 'wallet', name: 'Wallets', wallets: ['Paytm', 'PhonePe', 'Amazon Pay'] }
      ]
    },
    {
      id: 'cash_on_delivery',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order'
    }
  ];

  res.json({
    success: true,
    paymentMethods
  });
});

// Get Order by ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user', 'email firstName lastName');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

// Update Payment Status
router.put('/update-status/:orderId', async (req, res) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    if (paymentDetails) {
      order.paymentDetails = { ...order.paymentDetails, ...paymentDetails };
    }

    await order.save();

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status'
    });
  }
});

module.exports = router;
