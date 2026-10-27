@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
title tayyab.co - dev server

echo.
echo   tayyab.co  -  local development
echo   ---------------------------------------------
echo.

where node >nul 2>&1
if not errorlevel 1 goto :have_node
echo   [ERROR] Node.js was not found on your PATH.
echo   Install Node.js 20 or newer from https://nodejs.org and run this file again.
goto :fail
:have_node

set "PM="
where pnpm >nul 2>&1
if not errorlevel 1 set "PM=pnpm"
if not defined PM if exist "%APPDATA%\npm\pnpm.cmd" set "PM=%APPDATA%\npm\pnpm.cmd"
if not defined PM where npm >nul 2>&1
if not defined PM if not errorlevel 1 set "PM=npm"
if not defined PM if exist "%APPDATA%\npm\npm.cmd" set "PM=%APPDATA%\npm\npm.cmd"
if not defined PM goto :no_pm

echo   Package manager: !PM!
echo.

if exist "node_modules\" goto :start
echo   Installing dependencies (first run only, takes a few minutes)...
echo.
call "!PM!" install
if errorlevel 1 goto :install_failed
echo.

:start
echo   Starting the dev server on http://localhost:3000
echo   Your browser will open automatically.
echo   Press Ctrl+C in this window to stop the server.
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "$u='http://localhost:3000'; for ($i=0; $i -lt 120; $i++) { try { if ((Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200) { Start-Process $u; break } } catch {}; Start-Sleep -Milliseconds 500 }"

call "!PM!" dev

echo.
echo   Dev server stopped.
pause
exit /b 0

:no_pm
echo   [ERROR] Neither pnpm nor npm was found.
echo   Reinstall Node.js from https://nodejs.org and run this file again.
goto :fail

:install_failed
echo   [ERROR] Dependency installation failed. See the messages above.
goto :fail

:fail
echo.
pause
exit /b 1
