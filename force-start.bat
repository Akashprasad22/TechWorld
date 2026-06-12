@echo off
echo 🚀 STARTING MERN E-COMMERCE - PORT CONFLICT FIX
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🔄 Force killing all processes on ports 3000 and 5000...
npx kill-port 3000 >nul 2>&1
npx kill-port 5000 >nul 2>&1
npx kill-port 3001 >nul 2>&1
npx kill-port 5001 >nul 2>&1

REM Wait for ports to be released
echo ⏳ Waiting for ports to be released...
timeout /t 5 /nobreak >nul

REM Check if ports are still in use
echo 🔍 Checking port status...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ❌ Port 3000 still in use, killing by force...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /F /PID %%a >nul 2>&1
)

netstat -ano | findstr :5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ❌ Port 5000 still in use, killing by force...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do taskkill /F /PID %%a >nul 2>&1
)

REM Wait again
timeout /t 3 /nobreak >nul

echo 📦 Starting backend server...
start "Backend Server" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\server && node server.js"

REM Wait for backend to start
echo ⏳ Waiting for backend to start...
timeout /t 8 /nobreak >nul

echo 📱 Starting frontend client...
start "Frontend Client" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\client && npm start"

echo.
echo ✅ Servers are starting...
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo 💡 Wait 15-20 seconds for both servers to fully start
echo 💡 Then open http://localhost:3000 in your browser
echo.
echo 🎯 If you still get port errors:
echo    1. Close all terminal windows
echo    2. Run this script again
echo    3. Or restart your computer
echo.
echo 🛑 Press Ctrl+C in server windows to stop
echo.
echo 🌐 Testing connections in 15 seconds...
timeout /t 15 /nobreak >nul

echo 🌐 Checking server status...
curl http://localhost:5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is running
) else (
    echo ❌ Backend server not responding
    echo 💡 Try killing ports manually: npx kill-port 5000
)

curl http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend server is running
) else (
    echo ❌ Frontend server not responding
    echo 💡 Try killing ports manually: npx kill-port 3000
)

echo.
echo 🎯 Try opening http://localhost:3000 in your browser now!
echo.
pause
