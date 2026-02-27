@echo off
REM Bill Management System - Windows Setup Script
REM This script will set up your development environment

echo.
echo =========================================
echo  Bill Management System - Setup
echo =========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    echo Please install Node.js and try again.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)

echo [OK] npm is installed
npm --version
echo.

REM Check if .env file exists
if exist ".env" (
    echo [OK] .env file already exists
    echo Skipping .env creation
) else (
    echo [INFO] Creating .env file from .env.example...
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo [OK] .env file created!
        echo.
        echo IMPORTANT: Edit .env file and update:
        echo - MONGODB_URI with your MongoDB connection string
        echo - JWT_SECRET with a random string
        echo.
    ) else (
        echo ERROR: .env.example file not found!
        pause
        exit /b 1
    )
)

REM Install npm packages
echo [INFO] Installing npm packages...
echo This may take a few minutes...
echo.

call npm install

if errorlevel 1 (
    echo ERROR: Failed to install packages
    pause
    exit /b 1
)

echo.
echo [OK] npm packages installed successfully
echo.

REM Display next steps
echo.
echo =========================================
echo  Setup Complete! Next Steps:
echo =========================================
echo.
echo 1. Edit .env file:
echo    - Set MONGODB_URI to your MongoDB connection
echo    - Change JWT_SECRET to a random string
echo.
echo 2. Start backend server:
echo    npm start
echo.
echo 3. Open login.html in browser
echo    - Use Live Server (right-click → Open with Live Server)
echo    - Or directly open: http://127.0.0.1:5500
echo.
echo 4. Create an account and test the system
echo.
echo 5. For deployment, follow DEPLOYMENT.md
echo.
echo Happy Bill Managing! 

pause
