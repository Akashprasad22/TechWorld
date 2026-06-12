@echo off
echo 📦 INSTALLING CLERK REACT SDK
echo.

REM Navigate to client directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon\client

echo 🔄 Installing @clerk/react...
call npm install @clerk/react

echo ✅ Clerk installed successfully!
echo.
echo 🚀 Now starting your app...
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🔄 Killing any port conflicts...
npx kill-port 5000 >nul 2>&1
npx kill-port 3000 >nul 2>&1

timeout /t 3 /nobreak >nul

echo 🚀 Starting servers...
start "Backend" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\server && node server.js"
timeout /t 5 /nobreak >nul
start "Frontend" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\client && npm start"

echo.
echo ✅ Both servers starting...
echo 📍 Open http://localhost:3000 in 10-15 seconds
echo 🎯 You should see Sign In/Sign Up buttons on homepage!
echo.
pause
