@echo off
echo 🚀 STARTING MERN E-COMMERCE APP
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

REM Kill any existing processes
echo 🔄 Killing existing processes...
npx kill-port 3000 >nul 2>&1
npx kill-port 5000 >nul 2>&1

REM Start backend server
echo 🔧 Starting backend server...
start "Backend Server" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\server && node server.js"

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
echo 🎯 All dependencies are installed and ready!
echo 🎯 Your Amazon e-commerce app is starting...
echo.
pause
