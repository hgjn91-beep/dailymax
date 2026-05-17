@echo off
title DailyMax First-Time Setup

cd /d "%~dp0"

if not exist "node_modules" (
    color 0A
    echo ========================================================
    echo  DAILYMAX FIRST-TIME SETUP
    echo ========================================================
    echo.
    echo  Preparing premium green desktop overlay...
    echo  Installing required packages. This will take about 
    echo  30-45 seconds, depending on your internet connection.
    echo.
    echo  Please do not close this window.
    echo.
    echo  [1/2] Fetching native runtime dependencies...
    call npm install --production
    echo.
    echo  [2/2] Setup successful! Starting DailyMax overlay...
    echo.
    echo ========================================================
    timeout /t 3 >nul
)

:: Clean up existing processes before booting
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im electron.exe >nul 2>&1

for /f "tokens=5" %%a in ('netstat -aon ^| findstr 5173') do (
    taskkill /f /pid %%a >nul 2>&1
)

:: Launch the local Electron binary directly (100% offline, zero prompts!)
start "" /B .\node_modules\electron\dist\electron.exe .
