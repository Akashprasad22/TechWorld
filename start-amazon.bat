@echo off
echo 🚀 STARTING PRODUCTION-READY AMAZON-LIKE MERN E-COMMERCE
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm with Node.js
    pause
    exit /b 1
)

echo ✅ Node.js and npm found!
echo.

REM Install dependencies
echo 📦 Installing server dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Server dependencies installation failed!
    pause
    exit /b 1
)

echo 📦 Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Client dependencies installation failed!
    pause
    exit /b 1
)

cd ..

echo ✅ All dependencies installed successfully!
echo.

REM Start development servers
echo 🚀 Starting development servers...
echo 📍 Backend server will run on: http://localhost:5000
echo 📍 Frontend client will run on: http://localhost:3000
echo.

echo 🛑 Press Ctrl+C to stop both servers
echo.

REM Start backend server in background
start "Backend Server" cmd /k "npm run server"

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Start frontend client
start "Frontend Client" cmd /k "npm run client"

echo.
echo ✅ Development servers started!
echo 🌐 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.
echo 💡 Open http://localhost:3000 in your browser to access the application
echo.
echo 📋 Available Commands:
echo    npm run dev     - Start both servers
echo    npm run server - Start only backend
echo    npm run client - Start only frontend
echo    npm start       - Start production server
echo    npm run build   - Build for production
echo.
echo 🎯 Your Amazon-like MERN e-commerce is now running!
echo.

REM Keep the script running
:loop
timeout /t 1 /nobreak >nul
goto loop
