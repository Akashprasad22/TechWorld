# MongoDB Setup Script for Windows PowerShell
# Execute with: powershell -ExecutionPolicy Bypass -File scripts/setup-mongodb.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MongoDB Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if MongoDB is running
function Test-MongoDBRunning {
    $process = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
    return $null -ne $process
}

# Function to start MongoDB service
function Start-MongoDBService {
    Write-Host "🔧 Starting MongoDB service..." -ForegroundColor Yellow
    try {
        Start-Service -Name "MongoDB" -ErrorAction Stop
        Write-Host "✅ MongoDB service started successfully" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "⚠️  MongoDB service not found or failed to start" -ForegroundColor Yellow
        return $false
    }
}

# Function to start MongoDB manually
function Start-MongoDBManual {
    $mongoPaths = @(
        "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe",
        "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe",
        "C:\mongodb\bin\mongod.exe",
        "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
    )
    
    foreach ($path in $mongoPaths) {
        if (Test-Path $path) {
            Write-Host "📍 Found MongoDB at: $path" -ForegroundColor Green
            
            # Create data directory if it doesn't exist
            $dataPath = "C:\data\db"
            if (!(Test-Path $dataPath)) {
                New-Item -ItemType Directory -Path $dataPath -Force | Out-Null
                Write-Host "📁 Created data directory: $dataPath" -ForegroundColor Green
            }
            
            Write-Host "🚀 Starting MongoDB manually..." -ForegroundColor Yellow
            Start-Process -FilePath $path -ArgumentList "--dbpath", $dataPath -WindowStyle Hidden
            Write-Host "✅ MongoDB started manually" -ForegroundColor Green
            return $true
        }
    }
    
    Write-Host "❌ MongoDB installation not found" -ForegroundColor Red
    Write-Host "💡 Please install MongoDB from: https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
    return $false
}

# Main execution
try {
    # Check if MongoDB is already running
    if (Test-MongoDBRunning) {
        Write-Host "✅ MongoDB is already running" -ForegroundColor Green
    } else {
        Write-Host "❌ MongoDB is not running" -ForegroundColor Red
        Write-Host ""
        
        # Try to start MongoDB service first
        $serviceStarted = Start-MongoDBService
        
        if (-not $serviceStarted) {
            # Fallback to manual start
            $manualStarted = Start-MongoDBManual
            
            if (-not $manualStarted) {
                Write-Host ""
                Write-Host "❌ Failed to start MongoDB" -ForegroundColor Red
                Write-Host "Please install MongoDB and run this script again" -ForegroundColor Red
                exit 1
            }
        }
    }
    
    # Wait for MongoDB to start
    Write-Host ""
    Write-Host "⏳ Waiting for MongoDB to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    
    # Test connection
    Write-Host "🔄 Testing MongoDB connection..." -ForegroundColor Yellow
    node scripts/test-db-connection.js
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 MongoDB setup completed successfully!" -ForegroundColor Green
        Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ MongoDB connection test failed" -ForegroundColor Red
        Write-Host "Check MongoDB logs and try again" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Error during setup: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
