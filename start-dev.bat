@echo off
setlocal

echo =========================
echo Starting HomeLab Dashboard
echo =========================

echo.
echo [1/2] Starting Backend...
start "Backend" cmd /k ^
"cd /d %~dp0backend && ^
call venv\Scripts\activate && ^
uvicorn main:app --reload"

echo.
echo [2/2] Starting Frontend...
start "Frontend" cmd /k ^
"cd /d %~dp0frontend && ^
npm run dev"

echo.
echo Done. Backend + Frontend started.
pause