@echo off
setlocal

set ROOT=%~dp0

echo =========================
echo Starting HomeLab Dashboard
echo =========================

echo.
echo [1/2] Starting Backend...
start "Backend" cmd /k "cd /d %ROOT%backend && call venv\Scripts\activate.bat && uvicorn main:app --reload"

echo.
echo [2/2] Starting Frontend...
start "Frontend" cmd /k "cd /d %ROOT%frontend && npm run dev"

pause