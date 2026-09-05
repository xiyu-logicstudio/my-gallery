@echo off
title XIYU LOGIC STUDIO - Auto Sync
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync_images.ps1"
echo.
pause
