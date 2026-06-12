@echo off
echo ========================================
echo TechHub E-commerce Setup Script
echo ========================================
echo.

echo Checking for Node.js and npm...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo.
    echo 💡 Please install Node.js from: https://nodejs.org/
    echo 💡 Download the LTS version and restart your command prompt
    echo.
    pause
    exit /b 1
)

npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed or not in PATH
    echo.
    echo 💡 npm should come with Node.js. Please reinstall Node.js
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

echo Installing server dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)

echo ✅ Server dependencies installed
echo.

echo Installing client dependencies...
call npm run install-client
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)

echo ✅ Client dependencies installed
echo.

echo ========================================
echo 🎉 Setup Complete!
echo ========================================
echo.
echo To start the application:
echo   npm run dev     (Start both server and client)
echo   npm run server  (Start backend only)
echo   npm run client  (Start frontend only)
echo.
echo For production:
echo   npm start
echo.
echo Press any key to exit...
pause >nul
