@echo off
echo 🚀 Starting LinguaVerse Development Server...
echo.

echo 🔍 Checking for processes using port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo 🧹 Cleaning up any existing .next directory...
if exist .next rmdir /s /q .next

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🌍 Starting development server on port 3000...
echo.
call npm run dev 