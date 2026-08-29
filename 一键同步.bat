@echo off
chcp 65001 >nul
title LOGIC STUDIO - 自动同步工具
set "PATH=C:\Users\26399\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd;%PATH%"
echo =======================================================
echo   XIYU LOGIC STUDIO - 自动图片处理与 GitHub 同步
echo =======================================================
echo.
echo [1/2] 正在压缩图片并提取 EXIF 拍摄参数...
powershell -ExecutionPolicy Bypass -File .\sync_images.ps1

echo.
echo [2/2] 正在提交更改并推送到 GitHub...
git add .
git commit -m "Auto update: photos and metadata sync"
git push

echo.
echo =======================================================
echo   全部处理完毕！网站已同步更新。
echo =======================================================
pause
