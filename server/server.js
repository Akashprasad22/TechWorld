nconst express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techhub';
  
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Basic Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN E-commerce API is running!',
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected',
    server: 'Running',
    timestamp: new Date().toISOString()
  });
});

// Import Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const legacyOrderRoutes = require('./routes/order');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payment');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', legacyOrderRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Start Server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
