@echo off
echo 🚀 Starting MERN E-commerce Development Server...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    echo 📥 Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm first.
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

REM Start both server and client
echo 🚀 Starting server and client...
echo 📍 Server will run on: http://localhost:5000
echo 📍 Client will run on: http://localhost:3000
echo.

REM Start server in background
start "Backend Server" cmd /k "npm run server"

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Start client
start "Frontend Client" cmd /k "npm run client"

echo.
echo ✅ Development server started!
echo 🌐 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.
echo 💡 Press Ctrl+C to stop both servers
echo.

REM Keep the script running
:loop
timeout /t 1 /nobreak >nul
goto loop
