# MongoDB Start Script for Windows PowerShell
# Execute with: powershell -ExecutionPolicy Bypass -File scripts/start-mongodb.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MongoDB Service Manager" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if MongoDB is running
function Test-MongoDBRunning {
    $process = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
    return $null -ne $process
}

# Function to get MongoDB status
function Get-MongoDBStatus {
    if (Test-MongoDBRunning) {
        $process = Get-Process -Name "mongod"
        $startTime = $process.StartTime
        $memory = [math]::Round($process.WorkingSet64 / 1MB, 2)
        
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
        Write-Host "   Started: $startTime" -ForegroundColor Gray
        Write-Host "   Memory: $memory MB" -ForegroundColor Gray
        return $true
    } else {
        Write-Host "❌ MongoDB is not running" -ForegroundColor Red
        return $false
    }
}

# Function to start MongoDB service
function Start-MongoDBService {
    Write-Host "🔧 Starting MongoDB service..." -ForegroundColor Yellow
    
    try {
        $service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
        
        if ($service) {
            Start-Service -Name "MongoDB" -ErrorAction Stop
            Write-Host "✅ MongoDB service started successfully" -ForegroundColor Green
            return $true
        } else {
            Write-Host "⚠️  MongoDB service not found" -ForegroundColor Yellow
            return $false
        }
    } catch {
        Write-Host "❌ Failed to start MongoDB service: $_" -ForegroundColor Red
        return $false
    }
}

# Function to start MongoDB manually
function Start-MongoDBManual {
    $mongoPaths = @(
        "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe",
        "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe",
        "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe",
        "C:\mongodb\bin\mongod.exe"
    )
    
    foreach ($path in $mongoPaths) {
        if (Test-Path $path) {
            Write-Host "📍 Found MongoDB at: $path" -ForegroundColor Green
            
            $dataPath = "C:\data\db"
            if (!(Test-Path $dataPath)) {
                New-Item -ItemType Directory -Path $dataPath -Force | Out-Null
                Write-Host "📁 Created data directory: $dataPath" -ForegroundColor Green
            }
            
            Write-Host "🚀 Starting MongoDB manually..." -ForegroundColor Yellow
            try {
                Start-Process -FilePath $path -ArgumentList "--dbpath", $dataPath -WindowStyle Minimized
                Write-Host "✅ MongoDB started manually" -ForegroundColor Green
                return $true
            } catch {
                Write-Host "❌ Failed to start MongoDB manually: $_" -ForegroundColor Red
                return $false
            }
        }
    }
    
    Write-Host "❌ MongoDB installation not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Please install MongoDB from:" -ForegroundColor Cyan
    Write-Host "   https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
    return $false
}

# Function to stop MongoDB
function Stop-MongoDB {
    Write-Host "🛑 Stopping MongoDB..." -ForegroundColor Yellow
    
    try {
        $service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
        if ($service) {
            Stop-Service -Name "MongoDB" -Force -ErrorAction Stop
            Write-Host "✅ MongoDB service stopped" -ForegroundColor Green
        }
        
        $processes = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
        if ($processes) {
            $processes | Stop-Process -Force -ErrorAction SilentlyContinue
            Write-Host "✅ MongoDB processes terminated" -ForegroundColor Green
        }
        
        return $true
    } catch {
        Write-Host "❌ Failed to stop MongoDB: $_" -ForegroundColor Red
        return $false
    }
}

# Function to test connection
function Test-MongoDBConnection {
    Write-Host "🔄 Testing MongoDB connection..." -ForegroundColor Yellow
    
    try {
        $result = node scripts/test-db-connection.js 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ MongoDB connection successful" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ MongoDB connection failed" -ForegroundColor Red
            Write-Host $result -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Connection test error: $_" -ForegroundColor Red
        return $false
    }
}

# Main execution
$command = $args[0]

if (-not $command) {
    Write-Host "Usage:" -ForegroundColor Cyan
    Write-Host "  npm run start-mongo status    - Check MongoDB status" -ForegroundColor Gray
    Write-Host "  npm run start-mongo start     - Start MongoDB" -ForegroundColor Gray
    Write-Host "  npm run start-mongo stop      - Stop MongoDB" -ForegroundColor Gray
    Write-Host "  npm run start-mongo restart   - Restart MongoDB" -ForegroundColor Gray
    Write-Host "  npm run start-mongo test      - Test connection" -ForegroundColor Gray
    exit 0
}

switch ($command.ToLower()) {
    "status" {
        Get-MongoDBStatus
    }
    
    "start" {
        if (Test-MongoDBRunning) {
            Write-Host "✅ MongoDB is already running" -ForegroundColor Green
        } else {
            $serviceStarted = Start-MongoDBService
            if (-not $serviceStarted) {
                $manualStarted = Start-MongoDBManual
                if (-not $manualStarted) {
                    exit 1
                }
            }
            
            Write-Host ""
            Write-Host "⏳ Waiting for MongoDB to start..." -ForegroundColor Yellow
            Start-Sleep -Seconds 3
            Get-MongoDBStatus
        }
    }
    
    "stop" {
        Stop-MongoDB
    }
    
    "restart" {
        Write-Host "🔄 Restarting MongoDB..." -ForegroundColor Yellow
        Stop-MongoDB
        Start-Sleep -Seconds 2
        $serviceStarted = Start-MongoDBService
        if (-not $serviceStarted) {
            $manualStarted = Start-MongoDBManual
            if (-not $manualStarted) {
                exit 1
            }
        }
        
        Write-Host ""
        Write-Host "⏳ Waiting for MongoDB to restart..." -ForegroundColor Yellow
        Start-Sleep -Seconds 3
        Get-MongoDBStatus
    }
    
    "test" {
        Test-MongoDBConnection
    }
    
    default {
        Write-Host "❌ Unknown command: $command" -ForegroundColor Red
        Write-Host "Use 'status', 'start', 'stop', 'restart', or 'test'" -ForegroundColor Gray
        exit 1
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
