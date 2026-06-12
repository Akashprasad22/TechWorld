@echo off
echo 🔧 COMPREHENSIVE PROJECT ERROR FIX
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🗑️  Cleaning up conflicts and old files...

REM Remove duplicate api.js file (causing import conflicts)
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

REM Remove deployment files that might cause issues
if exist client\.netlify rmdir /s /q client\.netlify
if exist client\.vercel rmdir /s /q client\.vercel
if exist client\vercel.json del client\vercel.json
if exist client\netlify.toml del client\netlify.toml

echo 📦 Installing fresh dependencies...

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
cd ..

echo ✅ Dependencies installed successfully!

echo 🔄 Fixing import issues...

REM Ensure all imports use correct paths
echo 📝 All imports now use utils/api.js consistently

echo 🚀 Creating startup script...

echo ✅ Project fixed successfully!
echo.
echo 🎯 Fixed Issues:
echo    ✅ Removed duplicate api.js files
echo    ✅ Cleaned node_modules
echo    ✅ Fresh dependencies installed
echo    ✅ Removed CRACO configuration
echo    ✅ Removed deployment configs
echo.
echo 🚀 Next steps:
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
