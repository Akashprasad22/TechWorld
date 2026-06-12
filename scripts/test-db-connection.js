const mongoose = require('mongoose');
require('dotenv').config();

// Enhanced database connection test with detailed diagnostics
const testConnection = async () => {
  console.log('� MongoDB Connection Diagnostics');
  console.log('=====================================');
  
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techhub';
    
    console.log('📍 Configuration:');
    console.log(`   URI: ${mongoURI}`);
    console.log(`   Host: 127.0.0.1`);
    console.log(`   Port: 27017`);
    console.log(`   Database: techhub`);
    console.log('');
    
    console.log('🔄 Testing connection...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ MongoDB Connection Successful!');
    console.log('=====================================');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📍 Port: ${conn.connection.port}`);
    console.log(`📍 Database: ${conn.connection.name}`);
    console.log(`📍 Ready State: ${conn.connection.readyState} (1 = Connected)`);
    
    // Test database operations
    console.log('');
    console.log('🧪 Testing database operations...');
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({
      test: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', TestSchema);
    
    const testDoc = await TestModel.create({ test: 'Connection test' });
    console.log('✅ Write operation successful');
    
    const foundDoc = await TestModel.findById(testDoc._id);
    console.log('✅ Read operation successful');
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Delete operation successful');
    
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
    console.log('');
    console.log('🎉 All database operations working correctly!');
    console.log('=====================================');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error('=====================================');
    console.error('📍 Error Code:', error.code);
    console.error('📍 Error Name:', error.name);
    console.error('📍 Error Message:', error.message);
    
    // Detailed error analysis
    console.log('');
    console.log('🔍 Error Analysis:');
    
    switch (error.code) {
      case 'ECONNREFUSED':
        console.log('❌ Connection Refused');
        console.log('💡 Causes:');
        console.log('   - MongoDB service is not running');
        console.log('   - MongoDB is listening on a different port');
        console.log('   - Firewall is blocking the connection');
        console.log('');
        console.log('🔧 Solutions:');
        console.log('   1. Start MongoDB: npm run start-mongo start');
        console.log('   2. Check if MongoDB is running: npm run start-mongo status');
        console.log('   3. Verify MongoDB installation');
        break;
        
      case 'ENOTFOUND':
        console.log('❌ Host Not Found');
        console.log('💡 Causes:');
        console.log('   - Incorrect hostname in connection string');
        console.log('   - DNS resolution issues');
        console.log('');
        console.log('🔧 Solutions:');
        console.log('   1. Use 127.0.0.1 instead of localhost');
        console.log('   2. Check network connectivity');
        break;
        
      case 'EACCES':
        console.log('❌ Permission Denied');
        console.log('💡 Causes:');
        console.log('   - Insufficient permissions to access MongoDB');
        console.log('   - MongoDB data directory permissions');
        console.log('');
        console.log('🔧 Solutions:');
        console.log('   1. Run as administrator');
        console.log('   2. Check MongoDB data directory permissions');
        break;
        
      case 'ETIMEDOUT':
        console.log('❌ Connection Timeout');
        console.log('💡 Causes:');
        console.log('   - MongoDB server is not responding');
        console.log('   - Network latency issues');
        console.log('');
        console.log('🔧 Solutions:');
        console.log('   1. Restart MongoDB service');
        console.log('   2. Check MongoDB logs');
        break;
        
      default:
        console.log('❌ Unknown Error');
        console.log('💡 Check MongoDB installation and configuration');
    }
    
    console.log('');
    console.log('🛠️  Quick Fix Commands:');
    console.log('   npm run start-mongo start    - Start MongoDB');
    console.log('   npm run start-mongo status   - Check status');
    console.log('   npm run start-mongo restart  - Restart MongoDB');
    console.log('   npm run setup-db             - Full setup');
    
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

testConnection();
