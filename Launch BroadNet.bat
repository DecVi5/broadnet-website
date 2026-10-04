@echo off
title BroadNet Dev Server
color 0A
cls

echo.
echo  ================================================
echo   BroadNet Website - Local Development Server
echo  ================================================
echo.

:: Kill anything on port 3000
echo  [1/3] Clearing port 3000...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)

:: Move to project folder
cd /d "D:\Work\Brands\BroadNet\broadnet-nextjs"

echo  [2/3] Starting server... (takes ~5 seconds)
echo.

:: Open browser after 7 second delay in background
start /b cmd /c "timeout /t 7 /nobreak >nul && start http://localhost:3000"

:: Start the server (this line stays running - DO NOT CLOSE THIS WINDOW)
echo  [3/3] Server running at http://localhost:3000
echo.
echo  *** Keep this window open. Close it to stop the server. ***
echo.
npm run dev
