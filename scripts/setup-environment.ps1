# Setup development environment

Write-Host "🔧 Setting up development environment..." -ForegroundColor Green

# Check Node.js version
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Gray

# Check Docker
$dockerVersion = docker --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not installed. Please install Docker and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker version: $dockerVersion" -ForegroundColor Gray

# Install Auth Service dependencies
Write-Host "📦 Installing Auth Service dependencies..." -ForegroundColor Yellow
Set-Location auth-service
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file from .env.example" -ForegroundColor Gray
}
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Auth Service dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Install Product Service dependencies
Write-Host "📦 Installing Product Service dependencies..." -ForegroundColor Yellow
Set-Location product-service
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file from .env.example" -ForegroundColor Gray
}
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Product Service dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

Write-Host "✅ Development environment setup complete!" -ForegroundColor Green
Write-Host "🚀 Run './scripts/start-services.ps1' to start all services" -ForegroundColor Cyan
