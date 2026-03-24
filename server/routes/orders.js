const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { user, items, shippingAddress, paymentMethod } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for product: ${product.name}` 
        });
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// Get orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    let query = { user: userId };
    if (status) {
      query.orderStatus = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .populate('items.product', 'name image')
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalOrders: total
      }
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Update order status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        orderStatus,
        ...(trackingNumber && { trackingNumber })
      },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ message: 'Error updating order status' });
  }
});

// Update payment status (admin only)
router.put('/:id/payment', async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(400).json({ message: 'Error updating payment status' });
  }
});

// Cancel order
router.put('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.orderStatus === 'shipped' || order.orderStatus === 'delivered') {
      return res.status(400).json({ 
        message: 'Cannot cancel order that has been shipped or delivered' 
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(400).json({ message: 'Error cancelling order' });
  }
});

// Get all orders (admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;

    let query = {};
    
    if (status) {
      query.orderStatus = status;
    }
    
    if (startDate || endDate) {
      query.orderDate = {};
      if (startDate) query.orderDate.$gte = new Date(startDate);
      if (endDate) query.orderDate.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalOrders: total
      }
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
