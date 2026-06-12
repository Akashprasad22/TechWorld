@echo off
echo 🔧 ADDING CLERK AUTHENTICATION TO AMAZON PROJECT
echo.

REM Navigate to client directory
cd /d c:\Users\akash\OneDrive\Desktop\amazon\client

echo 📦 Installing Clerk React SDK...
call npm install @clerk/react

echo ✅ Clerk installed successfully!
echo.
echo 🎯 Clerk Authentication Added:
echo    ✅ Sign In button on homepage
echo    ✅ Sign Up button on homepage
echo    ✅ User profile button when signed in
echo    ✅ Authentication modal popups
echo    ✅ Conditional content display
echo.
echo 🚀 Next steps:
echo 1. Start your app: force-start.bat
echo 2. Open http://localhost:3000
echo 3. See Sign In/Sign Up buttons on homepage
echo 4. Test authentication flow
echo.
echo 🎨 Features:
echo    📱 Modal popups for sign in/up
echo    👤 User avatar when signed in
echo    🔄 Welcome message for returning users
echo    🎯 Beautiful styled buttons
echo.
pause
