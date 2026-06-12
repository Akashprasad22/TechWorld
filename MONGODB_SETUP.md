# MongoDB Setup Guide

## 🚀 Quick Setup

### 1. Install MongoDB
```bash
# Windows
# Download and install MongoDB Community Server
# https://www.mongodb.com/try/download/community

# macOS
brew install mongodb-community

# Linux
sudo apt-get install mongodb
```

### 2. Start MongoDB Service
```bash
# Windows (as Administrator)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 3. Test Connection
```bash
# Test database connection
npm run test-db

# Setup database (includes starting MongoDB if needed)
npm run setup-db
```

## 🔧 Configuration

### Environment Variables (.env)
```
MONGODB_URI=mongodb://127.0.0.1:27017/techhub
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Connection String Format
```
mongodb://127.0.0.1:27017/techhub
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ "localhost:27017 Unknown"
**Causes:**
- MongoDB service not running
- Wrong connection string format
- Firewall blocking connection

**Solutions:**
1. Start MongoDB service
2. Use 127.0.0.1 instead of localhost
3. Check firewall settings

#### ❌ "ECONNREFUSED"
**Solution:**
```bash
# Check if MongoDB is running
pgrep mongod

# Start MongoDB if not running
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
net start MongoDB  # Windows
```

#### ❌ "Authentication failed"
**Solution:**
```bash
# Check if auth is enabled in MongoDB config
# Update connection string if needed
mongodb://username:password@127.0.0.1:27017/techhub
```

## 📝 Database Operations

### Create Database
```javascript
// Database will be created automatically on first connection
mongoose.connect('mongodb://127.0.0.1:27017/techhub');
```

### Verify Connection
```javascript
// Check connection status
mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
```

## 🔍 Debug Commands

### Check MongoDB Status
```bash
# Check if MongoDB process is running
pgrep -f mongod

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log

# Test connection manually
mongo --eval "db.adminCommand('ismaster')"
```

### Network Test
```bash
# Test port accessibility
telnet 127.0.0.1 27017

# Check listening ports
netstat -an | grep 27017
```

## 🚨 Error Codes Reference

| Error Code | Description | Solution |
|------------|-------------|----------|
| ECONNREFUSED | Connection refused | Start MongoDB service |
| ENOTFOUND | Host not found | Check hostname/IP |
| EACCES | Permission denied | Check MongoDB permissions |
| ETIMEDOUT | Connection timeout | Check network/firewall |

## 📱 Development Workflow

### 1. Start MongoDB
```bash
# Option 1: Start service
net start MongoDB

# Option 2: Run manually
mongod --dbpath /data/db
```

### 2. Test Connection
```bash
npm run test-db
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔐 Security Notes

- Change default MongoDB port in production
- Enable authentication in production
- Use environment variables for sensitive data
- Regularly update MongoDB to latest version
