@echo off
echo 🚀 Deploying React Frontend to Vercel...
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

REM Navigate to client directory
cd client

REM Build the application
echo 🔨 Building React application...
npm run build:vercel

if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

if %errorlevel% neq 0 (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo ✅ Deployment successful!
echo 🌐 Your app is now live on Vercel!
echo.
echo 📋 Next Steps:
echo 1. Update your backend URL in Vercel environment variables
echo 2. Set REACT_APP_API_URL to your production backend URL
echo 3. Configure REACT_APP_RAZORPAY_KEY_ID for production
echo.
pause
