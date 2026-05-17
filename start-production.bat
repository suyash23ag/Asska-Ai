@echo off
echo ========================================
echo   ASSka AI - Production Server
echo ========================================
echo.

echo [1/3] Checking if frontend is built...
if not exist "client\dist" (
    echo Frontend not built. Building now...
    cd client
    call npm install
    call npm run build
    cd ..
) else (
    echo Frontend already built!
)

echo.
echo [2/3] Installing backend dependencies...
cd backend
call npm install

echo.
echo [3/3] Starting production server...
echo.
echo ========================================
echo   Server starting on http://localhost:3000
echo ========================================
echo.

call npm start
