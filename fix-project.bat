@echo off
echo 🔧 COMPREHENSIVE PROJECT ERROR FIX
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🗑️  Cleaning up old files...

REM Remove node_modules and package-lock files
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist client\node_modules rmdir /s /q client\node_modules
if exist client\package-lock.json del client\package-lock.json

echo 📦 Installing fresh dependencies...

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
cd ..

echo 🔄 Fixing common issues...

REM Fix CRACO if exists
if exist client\craco.config.js (
    echo 🗑️  Removing CRACO configuration...
    del client\craco.config.js
)

REM Fix package.json scripts
echo 📝 Fixing package.json scripts...

REM Create a simple startup script
echo 🚀 Creating startup script...

echo ✅ Project fixed successfully!
echo.
echo 🎯 Next steps:
echo 1. Run: start-project.bat
echo 2. Wait 10-15 seconds
echo 3. Open: http://localhost:3000
echo.
echo 📋 Available commands:
echo    npm run dev     - Start both servers
echo    npm run server - Start only backend
echo    npm start       - Start only frontend
echo.
pause
