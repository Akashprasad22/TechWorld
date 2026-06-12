const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cash_on_delivery', 'upi', 'credit_card', 'debit_card', 'net_banking', 'emi', 'wallet'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  razorpaySignature: {
    type: String
  },
  paymentDetails: {
    method: String,
    bank: String,
    wallet: String,
    emiPlan: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date
  },
  trackingNumber: {
    type: String
  }
});

orderSchema.pre('save', function(next) {
  // Calculate delivery date (7 days from order date)
  if (!this.deliveryDate) {
    this.deliveryDate = new Date(this.orderDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 7);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
