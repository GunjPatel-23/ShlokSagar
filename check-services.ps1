# ShlokSagar Services Status Check
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "   ShlokSagar Services Check" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Backend Check
Write-Host "1. Backend (Port 3000)" -ForegroundColor Yellow
try {
    $backend = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get -TimeoutSec 5
    Write-Host "   ✓ Status: " -NoNewline -ForegroundColor Green
    Write-Host $backend.status -ForegroundColor White
    Write-Host "   ✓ Time: " -NoNewline -ForegroundColor Green
    Write-Host $backend.time -ForegroundColor White
    Write-Host "   ✓ URL: http://localhost:3000`n" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Backend not responding`n" -ForegroundColor Red
}

# Public Frontend Check
Write-Host "2. Public Frontend (Port 8080)" -ForegroundColor Yellow
try {
    $public = Invoke-WebRequest -Uri "http://localhost:8080" -Method Get -TimeoutSec 5 -UseBasicParsing
    if ($public.StatusCode -eq 200) {
        Write-Host "   ✓ Status: Running" -ForegroundColor Green
        Write-Host "   ✓ URL: http://localhost:8080`n" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Public frontend not responding`n" -ForegroundColor Red
}

# Admin Frontend Check
Write-Host "3. Admin Frontend (Port 3001)" -ForegroundColor Yellow
try {
    $admin = Invoke-WebRequest -Uri "http://localhost:3001" -Method Get -TimeoutSec 5 -UseBasicParsing
    if ($admin.StatusCode -eq 200) {
        Write-Host "   ✓ Status: Running" -ForegroundColor Green
        Write-Host "   ✓ URL: http://localhost:3001`n" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Admin frontend not responding`n" -ForegroundColor Red
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   All Services Summary" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Backend API:       http://localhost:3000" -ForegroundColor White
Write-Host "Public Frontend:   http://localhost:8080" -ForegroundColor White
Write-Host "Admin Dashboard:   http://localhost:3001" -ForegroundColor White
Write-Host ""
