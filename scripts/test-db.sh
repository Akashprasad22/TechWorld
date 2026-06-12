#!/bin/bash

# MongoDB Connection Test Script
echo "Testing MongoDB connection..."

# Check if MongoDB is running
if pgrep -x mongod > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is not running"
    echo "Starting MongoDB..."
    # Start MongoDB (for Windows)
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        if [ -f "/c/Program Files/MongoDB/Server/6.0/bin/mongod.exe" ]; then
            "/c/Program Files/MongoDB/Server/6.0/bin/mongod.exe" --dbpath "/c/data/db"
        elif [ -f "/c/mongodb/bin/mongod.exe" ]; then
            "/c/mongodb/bin/mongod.exe" --dbpath "/c/data/db"
        else
            echo "MongoDB not found. Please install MongoDB first."
            echo "Download from: https://www.mongodb.com/try/download/community"
        fi
    else
        # Linux/Mac
        mongod --dbpath /data/db
    fi
fi

echo "Waiting for MongoDB to start..."
sleep 5

# Test connection
echo "Testing connection to mongodb://127.0.0.1:27017/techhub"
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/techhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connection successful!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});
"
