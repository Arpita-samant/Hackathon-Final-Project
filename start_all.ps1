# Start Yojana Sahayak (Backend + Frontend)
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting Yojana Sahayak (योजना सहायक)" -ForegroundColor Yellow
Write-Host "  Digital India Citizen Welfare Intelligence System" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# Start Backend
Write-Host "`n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Cyan
$backendProc = Start-Process -FilePath ".\backend\venv\Scripts\uvicorn.exe" -ArgumentList "app.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload" -WorkingDirectory "backend" -PassThru

# Start Frontend
Write-Host "[2/2] Starting Next.js Frontend on http://localhost:3000..." -ForegroundColor Cyan
$frontendProc = Start-Process -FilePath "npm.cmd" -ArgumentList "run", "dev" -WorkingDirectory "frontend" -PassThru

Write-Host "`n[SUCCESS] Yojana Sahayak is actively running!" -ForegroundColor Green
Write-Host "  -> Frontend Portal: http://localhost:3000" -ForegroundColor Yellow
Write-Host "  -> Backend Swagger: http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host "`nPress Ctrl+C or close the spawned windows to stop."
