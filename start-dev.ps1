Write-Host "🚀 Starting LinguaVerse Development Server..." -ForegroundColor Green
Write-Host ""

Write-Host "🔍 Checking for processes using port 3000..." -ForegroundColor Yellow
$processes = netstat -ano | Select-String ":3000" | ForEach-Object { ($_ -split '\s+')[4] } | Sort-Object -Unique

if ($processes) {
    Write-Host "Found processes using port 3000. Killing them..." -ForegroundColor Red
    foreach ($pid in $processes) {
        try {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Write-Host "Killed process $pid" -ForegroundColor Yellow
        } catch {
            Write-Host "Could not kill process $pid" -ForegroundColor Red
        }
    }
} else {
    Write-Host "Port 3000 is free!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🛑 Stopping all Node.js processes..." -ForegroundColor Yellow
try {
    taskkill /f /im node.exe >nul 2>&1
    Write-Host "Stopped all Node.js processes" -ForegroundColor Green
} catch {
    Write-Host "No Node.js processes found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🧹 Cleaning up cache directories..." -ForegroundColor Yellow

# Remove .next directory
if (Test-Path ".next") {
    try {
        Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
        Write-Host "Cleaned .next directory" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove .next directory - trying alternative method" -ForegroundColor Yellow
        # Alternative method for stubborn files
        cmd /c "rmdir /s /q .next" 2>$null
    }
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force >nul 2>&1

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🌍 Starting development server on port 3000..." -ForegroundColor Green
Write-Host ""

# Set environment variable to disable webpack cache if needed
$env:NEXT_DISABLE_WEBPACK_CACHE = "1"

npm run dev-clean 