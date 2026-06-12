@echo off
echo 🚀 STARTING MERN E-COMMERCE - SMART PORT HANDLING
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🔄 Killing all port conflicts...
npx kill-port 3000 >nul 2>&1
npx kill-port 3001 >nul 2>&1
npx kill-port 3002 >nul 2>&1
npx kill-port 5000 >nul 2>&1
npx kill-port 5001 >nul 2>&1

REM Wait for ports to be released
echo ⏳ Waiting for ports to be released...
timeout /t 5 /nobreak >nul

echo 📦 Starting backend server on port 5000...
start "Backend Server" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\server && node server.js"

REM Wait for backend to start
echo ⏳ Waiting for backend to start...
timeout /t 8 /nobreak >nul

echo 📱 Starting frontend client (will auto-select available port)...
start "Frontend Client" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\client && npm start"

echo.
echo ✅ Servers are starting...
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000 (or 3001, 3002 if ports are busy)
echo.
echo 💡 Wait 15-20 seconds for both servers to fully start
echo 💡 Check the frontend terminal for the actual port number
echo.
echo 🎯 Features Available:
echo    ✅ Clerk authentication (Sign In/Sign Up on homepage)
echo    ✅ Amazon-style navigation with search
echo    ✅ Product catalog and shopping cart
echo    ✅ Order management system
echo    ✅ User profiles and account management
echo.
echo 🛑 Press Ctrl+C in server windows to stop
echo.
echo 🌐 Checking connections in 15 seconds...
timeout /t 15 /nobreak >nul

echo 🌐 Checking server status...
curl http://localhost:5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is running on port 5000
) else (
    echo ❌ Backend server not responding
    echo 💡 Port 5000 might still be in use
    echo 💡 Try: npx kill-port 5000
)

echo.
echo 🎯 Check your frontend terminal for the actual port number
echo 🎯 Open that URL in your browser to see your app!
echo.
pause
