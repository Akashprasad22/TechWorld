const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const router = express.Router();

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

/**
 * @route   POST /api/payment/create-order
 * @desc    Create Razorpay order
 * @access  Public
 */
router.post('/create-order', async (req, res) => {
  try {
    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay keys are not configured on the server.'
      });
    }

    const { amount, currency = 'INR', receipt, notes } = req.body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Amount must be greater than 0.'
      });
    }

    // Create Razorpay order options
    const options = {
      amount: amount * 100, // Convert to paise (Razorpay expects amount in smallest currency unit)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
      payment_capture: 1 // Auto capture payment
    };

    // Create order
    const order = await razorpay.orders.create(options);

    console.log('✅ Razorpay order created:', order.id);

    // Return order details to frontend
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes
      },
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error);
    
    // Handle specific Razorpay errors
    if (error.error && error.error.description) {
      return res.status(400).json({
        success: false,
        message: error.error.description
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create payment order. Please try again.'
    });
  }
});

/**
 * @route   POST /api/payment/verify-payment
 * @desc    Verify Razorpay payment signature
 * @access  Public
 */
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData // Additional order details to save
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details'
      });
    }

    // Generate signature for verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature !== expectedSignature) {
      console.error('❌ Invalid payment signature');
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.'
      });
    }

    console.log('✅ Payment signature verified successfully');

    // If orderData is provided, save the order to database
    if (orderData) {
      try {
        const newOrder = new Order({
          user: orderData.user,
          products: orderData.items,
          totalAmount: orderData.totalAmount,
          shippingAddress: orderData.shippingAddress,
          paymentMethod: 'razorpay',
          paymentStatus: 'Paid',
          orderStatus: 'Confirmed',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentDetails: orderData.paymentDetails || {}
        });

        await newOrder.save();
        console.log('✅ Order saved to database:', newOrder._id);

        return res.json({
          success: true,
          message: 'Payment verified and order placed successfully',
          order: newOrder
        });
      } catch (dbError) {
        console.error('❌ Error saving order:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Payment verified but failed to save order'
        });
      }
    }

    // If no orderData, just verify payment
    res.json({
      success: true,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed. Please try again.'
    });
  }
});

/**
 * @route   POST /api/payment/cod-order
 * @desc    Create Cash on Delivery order
 * @access  Public
 */
router.post('/cod-order', async (req, res) => {
  try {
    const {
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentDetails
    } = req.body;

    // Validate required fields
    if (!user || !items || !totalAmount || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details'
      });
    }

    // Create COD order
    const codOrder = new Order({
      user,
      products: items,
      totalAmount,
      shippingAddress,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      paymentDetails: paymentDetails || { method: 'cash_on_delivery' }
    });

    await codOrder.save();
    console.log('✅ COD order created:', codOrder._id);

    res.json({
      success: true,
      message: 'Cash on Delivery order placed successfully',
      order: codOrder
    });

  } catch (error) {
    console.error('❌ Error creating COD order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place COD order. Please try again.'
    });
  }
});

/**
 * @route   GET /api/payment/methods
 * @desc    Get available payment methods
 * @access  Public
 */
router.get('/methods', (req, res) => {
  const paymentMethods = [
    {
      id: 'online',
      name: 'Online Payment',
      description: 'Pay instantly using UPI, Cards, Net Banking',
      methods: [
        { 
          type: 'upi', 
          name: 'UPI', 
          apps: ['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay'],
          icon: '📱'
        },
        { 
          type: 'card', 
          name: 'Debit/Credit Card',
          cards: ['Visa', 'Mastercard', 'Rupay', 'Amex'],
          icon: '💳'
        },
        { 
          type: 'netbanking', 
          name: 'Net Banking',
          banks: ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'],
          icon: '🏦'
        },
        { 
          type: 'emi', 
          name: 'EMI',
          plans: ['3 months', '6 months', '9 months', '12 months'],
          icon: '📊'
        }
      ]
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: '💰',
      note: 'Additional charges may apply'
    }
  ];

  res.json({
    success: true,
    paymentMethods
  });
});

/**
 * @route   GET /api/payment/test
 * @desc    Test Razorpay configuration
 * @access  Public
 */
router.get('/test', (req, res) => {
  try {
    // Check if Razorpay is properly configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay keys not configured'
      });
    }

    res.json({
      success: true,
      message: 'Razorpay is properly configured',
      key_id: process.env.RAZORPAY_KEY_ID.substring(0, 10) + '...', // Show partial key for security
      mode: 'TEST'
    });
  } catch (error) {
    console.error('❌ Razorpay test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Razorpay configuration test failed'
    });
  }
});

module.exports = router;
