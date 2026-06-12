@echo off
echo 🚀 STARTING MERN E-COMMERCE PROJECT
echo.

REM Kill any existing processes
echo 🔄 Killing existing processes on ports 3000 and 5000...
npx kill-port 3000 >nul 2>&1
npx kill-port 5000 >nul 2>&1

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start backend server
echo 🔧 Starting backend server...
start "Backend Server" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon && node server/server.js"

REM Wait for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend client
echo 📱 Starting frontend client...
start "Frontend Client" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\client && npm start"

echo.
echo ✅ Servers are starting...
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo 💡 Wait 10-15 seconds for both servers to fully start
echo 💡 Then open http://localhost:3000 in your browser
echo.
echo 🛑 Press Ctrl+C in the server windows to stop
echo.

REM Wait and check if servers are running
timeout /t 10 /nobreak >nul

echo 🌐 Testing server connections...
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
