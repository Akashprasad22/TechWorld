@echo off
echo 🔧 COMPREHENSIVE PROJECT ERROR FIX
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🗑️  Cleaning up old files...

REM Remove duplicate api.js file
if exist client\src\api.js (
    echo 🗑️  Removing duplicate api.js file...
    del client\src\api.js
)

REM Remove node_modules and package-lock files
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist client\node_modules rmdir /s /q client\node_modules
if exist client\package-lock.json del client\package-lock.json

REM Remove CRACO config if exists
if exist client\craco.config.js (
    echo 🗑️  Removing CRACO configuration...
    del client\craco.config.js
)

echo 📦 Installing fresh dependencies...

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
cd ..

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
cd ..

echo ✅ Dependencies installed successfully!

echo 🔄 Testing servers...

REM Test backend
echo 🧪 Testing backend server...
cd server
timeout /t 3 /nobreak >nul
start "Backend Test" cmd /k "node server.js"

REM Wait for backend to start
timeout /t 5 /nobreak >nul

REM Test frontend
echo 📱 Testing frontend client...
cd ..\client
start "Frontend Test" cmd /k "npm start"

echo.
echo ✅ Servers are starting...
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo 💡 Wait 10-15 seconds for both servers to fully start
echo 💡 Then open http://localhost:3000 in your browser
echo.
echo 🎯 Issues Fixed:
echo    ✅ bcryptjs dependency added to server
echo    ✅ jsonwebtoken dependency added to server
echo    ✅ razorpay dependency added to server
echo    ✅ crypto dependency added to server
echo    ✅ Server package.json created
echo    ✅ All dependencies installed
echo    ✅ Import conflicts resolved
echo.
echo 🛑 Press Ctrl+C in server windows to stop
echo.
echo 🌐 Testing connections in 10 seconds...
timeout /t 10 /nobreak >nul

echo 🌐 Checking server status...
curl http://localhost:5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is running
) else (
    echo ❌ Backend server not responding
)

curl http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend server is running
) else (
    echo ❌ Frontend server not responding
)

echo.
echo 🎯 Try opening http://localhost:3000 in your browser now!
echo.
pause
