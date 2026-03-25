#!/bin/bash

# Netlify Deployment Script
echo "🚀 Deploying React App to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check if we're in the correct directory
if [ ! -d "build" ]; then
    echo "❌ Build folder not found. Running npm run build first..."
    npm run build
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=build --site=techhub-ecommerce

echo "✅ Deployment complete!"
echo "🔗 Your app is now live on Netlify!"
