# TechHub E-commerce Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (optional - server will run without it)

## Quick Setup

### 1. Install Dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies  
npm run install-client
```

### 2. Start the Application
```bash
# Start both server and client (recommended for development)
npm run dev

# Or start individually:
npm run server  # Backend only
npm run client  # Frontend only
```

### 3. Production
```bash
npm start
```

## Environment Variables
Create a `.env` file in the root directory:
```
# MongoDB Connection (optional)
MONGODB_URI=mongodb://127.0.0.1:27017/techhub

# Server Configuration
PORT=5000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Environment
NODE_ENV=development
```

## Port Management
If you encounter port conflicts:
```bash
npm run kill-5000    # Kill process on port 5000
npm run port-check   # Check port status
npm run port-free    # Free all ports
```

## Features
- ✅ Express server with CORS and security
- ✅ MongoDB integration (graceful fallback if not available)
- ✅ JWT authentication
- ✅ Rate limiting
- ✅ Port conflict resolution
- ✅ Graceful shutdown
- ✅ Error handling
- ✅ Health check endpoint

## API Endpoints
- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/products` - Get products
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user

## Troubleshooting

### Node.js/npm not found
1. Download and install Node.js from https://nodejs.org
2. Restart your terminal/command prompt
3. Verify installation: `node -v` and `npm -v`

### MongoDB connection issues
The server will work without MongoDB. Some features may be limited, but the basic API will function.

### Port conflicts
The server automatically tries alternative ports (5001-5005) if 5000 is busy.

## Development
The server includes hot-reload with nodemon for development.
