@echo off
echo ========================================
echo MongoDB Quick Start
echo ========================================
echo.

:: Check if MongoDB is running
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I "mongod.exe"
if %ERRORLEVEL% equ 0 (
    echo ✅ MongoDB is already running
    goto :test
) else (
    echo ❌ MongoDB is not running
    echo.
    echo 🔧 Starting MongoDB...
)

:: Try to start MongoDB service
net start MongoDB 2>NUL
if %ERRORLEVEL% equ 0 (
    echo ✅ MongoDB service started
    goto :test
) else (
    echo ⚠️  Service not found, trying manual start...
)

:: Try common MongoDB paths
if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (
    echo 📍 Starting MongoDB from Program Files...
    start "MongoDB" "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath "C:\data\db"
    echo ✅ MongoDB started manually
    goto :test
)

if exist "C:\mongodb\bin\mongod.exe" (
    echo 📍 Starting MongoDB from C:\mongodb...
    start "MongoDB" "C:\mongodb\bin\mongod.exe" --dbpath "C:\data\db"
    echo ✅ MongoDB started manually
    goto :test
)

echo ❌ MongoDB installation not found
echo.
echo 💡 Please install MongoDB from: https://www.mongodb.com/try/download/community
pause
exit /b 1

:test
echo.
echo ⏳ Waiting for MongoDB to start...
timeout /t 5 >nul

echo 🔄 Testing connection...
node scripts/test-db-connection.js

if %ERRORLEVEL% equ 0 (
    echo.
    echo 🎉 MongoDB is ready!
    echo You can now run: npm run dev
) else (
    echo.
    echo ❌ Connection test failed
    echo Check MongoDB installation and try again
)

echo.
echo Press any key to exit...
pause >nul
