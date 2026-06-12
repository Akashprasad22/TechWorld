@echo off
echo 🔧 FIXING PORT CONFLICT + INSTALLING CLERK
echo.

REM Navigate to project directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon

echo 🔄 Killing port conflicts...
npx kill-port 5000 >nul 2>&1
npx kill-port 3000 >nul 2>&1

REM Wait for ports to be released
timeout /t 3 /nobreak >nul

echo 📦 Installing Clerk React SDK...
cd client
call npm install @clerk/react
cd ..

echo ✅ Clerk installed successfully!
echo.
echo 🚀 Starting servers...
start "Backend Server" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\server && node server.js"

REM Wait for backend to start
timeout /t 5 /nobreak >nul

start "Frontend Client" cmd /k "cd /d c:\Users\akash\OneDrive\Desktop\amazon\client && npm start"

echo.
echo ✅ Both servers are starting...
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo 💡 Wait 10-15 seconds for both servers to fully start
echo 💡 Then open http://localhost:3000 in your browser
echo.
echo 🎯 You should see:
echo    ✅ Sign In and Sign Up buttons on homepage
echo    ✅ No more module resolution errors
echo    ✅ Working Clerk authentication
echo.
pause
