const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const DEFAULT_PORT = process.env.PORT || 5000;
const PORT_ALTERNATIVES = [5001, 5002, 5003, 5004, 5005];

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB Connection with proper error handling and retry logic
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techhub';
  const maxRetries = 5;
  const retryDelay = 3000; // 3 seconds
  
  console.log('🔄 Attempting to connect to MongoDB...');
  console.log('📍 Connection URI:', mongoURI);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📍 Attempt ${attempt} of ${maxRetries}...`);
      
      const conn = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        connectTimeoutMS: 10000, // 10 seconds timeout
      });
      
      console.log('✅ MongoDB Connected Successfully!');
      console.log(`📍 Host: ${conn.connection.host}`);
      console.log(`📍 Database: ${conn.connection.name}`);
      console.log(`📍 Port: ${conn.connection.port}`);
      
      // Start server only after successful DB connection
      const serverResult = await startServer();
      serverInstance = serverResult.server;
      return;
      
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`);
      console.error('📍 Error Code:', error.code);
      console.error('📍 Error Message:', error.message);
      
      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in ${retryDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        console.error('❌ All connection attempts failed');
        
        // Provide helpful error messages
        switch (error.code) {
          case 'ECONNREFUSED':
            console.log('💡 Solution: MongoDB is not running or not accessible');
            console.log('💡 Run: npm run start-mongo start');
            break;
          case 'ENOTFOUND':
            console.log('💡 Solution: Check MongoDB hostname and network connectivity');
            break;
          case 'EACCES':
            console.log('💡 Solution: Check MongoDB permissions and firewall settings');
            break;
          case 'ETIMEDOUT':
            console.log('💡 Solution: MongoDB server is not responding');
            break;
          default:
            console.log('💡 Solution: Check MongoDB installation and configuration');
        }
        
        // Fallback: Start server without DB
        console.log('⚠️  Starting server without database connection...');
        console.log('📝 Some features may not work properly');
        const serverResult = await startServer();
        serverInstance = serverResult.server;
      }
    }
  }
};

// Start server function with port conflict handling
const startServer = async (preferredPort = DEFAULT_PORT) => {
  return new Promise((resolve, reject) => {
    const tryPort = (portIndex = 0) => {
      const port = portIndex === 0 ? preferredPort : PORT_ALTERNATIVES[portIndex - 1];
      
      const server = app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📍 URL: http://localhost:${port}`);
        
        // Check database connection status
        if (mongoose.connection.readyState === 1) {
          console.log('✅ Database connected and ready');
        } else {
          console.log('⚠️  Database not connected - Some features may be limited');
          console.log('💡 To fix database connection: npm run start-mongo start');
        }
        
        // If we're using an alternative port, show a warning
        if (port !== preferredPort) {
          console.log(`⚠️  Port ${preferredPort} was busy, using port ${port} instead`);
          console.log(`💡 To use port ${preferredPort}, run: netstat -ano | findstr :${preferredPort}`);
          console.log(`💡 Then kill the process: taskkill /PID <PID> /F`);
        }
        
        resolve({ server, port });
      });
      
      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.log(`❌ Port ${port} is already in use`);
          
          // Try to kill the process on this port
          if (portIndex === 0) {
            console.log(`🔄 Attempting to kill process on port ${port}...`);
            killProcessOnPort(port).then(() => {
              console.log(`⏳ Waiting 2 seconds before retrying...`);
              setTimeout(() => {
                tryPort(portIndex); // Retry the same port
              }, 2000);
            }).catch(() => {
              console.log(`⚠️  Could not kill process on port ${port}`);
              tryAlternativePort();
            });
          } else {
            tryAlternativePort();
          }
        } else {
          console.error(`❌ Server error: ${error.message}`);
          reject(error);
        }
      });
      
      const tryAlternativePort = () => {
        if (portIndex < PORT_ALTERNATIVES.length) {
          const nextPort = PORT_ALTERNATIVES[portIndex];
          console.log(`🔄 Trying alternative port ${nextPort}...`);
          tryPort(portIndex + 1);
        } else {
          console.error(`❌ All ports are busy: [${preferredPort}, ${PORT_ALTERNATIVES.join(', ')}]`);
          console.log(`💡 Manually kill processes or choose a different port`);
          reject(new Error('All ports are busy'));
        }
      };
    };
    
    tryPort();
  });
};

// Function to kill process on a specific port
const killProcessOnPort = (port) => {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32' 
      ? `netstat -ano | findstr :${port}`
      : `lsof -ti:${port}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error || !stdout) {
        reject(new Error('No process found on port'));
        return;
      }
      
      if (process.platform === 'win32') {
        // Windows: Parse netstat output to get PID
        const lines = stdout.trim().split('\n');
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== 'PID') {
            exec(`taskkill /PID ${pid} /F`, (killError) => {
              if (killError) {
                reject(killError);
              } else {
                console.log(`✅ Killed process ${pid} on port ${port}`);
                resolve();
              }
            });
            return;
          }
        }
        reject(new Error('No PID found'));
      } else {
        // Unix/Linux: Kill process directly
        exec(`kill -9 ${stdout.trim()}`, (killError) => {
          if (killError) {
            reject(killError);
          } else {
            console.log(`✅ Killed process ${stdout.trim()} on port ${port}`);
            resolve();
          }
        });
      }
    });
  });
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TechHub API' });
});

// Product Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Order Routes
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

// User Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Handle graceful shutdown
let serverInstance = null;

process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('✅ Server closed');
    });
  }
  
  await mongoose.connection.close();
  console.log('✅ Database connection closed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...');
  
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('✅ Server closed');
    });
  }
  
  await mongoose.connection.close();
  console.log('✅ Database connection closed');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  if (serverInstance) {
    serverInstance.close();
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  if (serverInstance) {
    serverInstance.close();
  }
  process.exit(1);
});

// Initialize database connection and start server
connectDB().then(() => {
  console.log('✅ Initialization complete');
}).catch((error) => {
  console.error('❌ Failed to initialize server:', error.message);
  process.exit(1);
});
