@echo off
echo 🚀 STARTING MERN E-COMMERCE APP (CLEAN START)
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🔄 Killing existing processes on ports 3000 and 5000...
npx kill-port 3000 >nul 2>&1
npx kill-port 5000 >nul 2>&1

REM Wait a moment for ports to be released
timeout /t 3 /nobreak >nul

echo 📦 Checking dependencies...

REM Check if server dependencies are installed
if not exist server\node_modules (
    echo 📦 Installing server dependencies...
    cd server
    call npm install
    cd ..
)

REM Check if client dependencies are installed  
if not exist client\node_modules (
    echo 📦 Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo 🗄️  Seeding database...
cd server
call node seed.js
cd ..

echo 🔧 Starting backend server...
start "Backend Server" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\server && node server.js"

REM Wait for backend to start
timeout /t 5 /nobreak >nul

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
echo 🎯 If you still get port errors, run these commands manually:
echo    npx kill-port 3000
echo    npx kill-port 5000
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
    echo ❌ Backend server not responding - try killing ports again
)

curl http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend server is running
) else (
    echo ❌ Frontend server not responding - try killing ports again
)

echo.
echo 🎯 Try opening http://localhost:3000 in your browser now!
echo.
pause
