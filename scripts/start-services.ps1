# Start all services for development

Write-Host "🚀 Starting Lyxa AI Test Services..." -ForegroundColor Green

# Check if Docker is running
$dockerRunning = docker info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running. Please start Docker and try again." -ForegroundColor Red
    exit 1
}

# Start infrastructure services
Write-Host "📦 Starting infrastructure services (MongoDB & RabbitMQ)..." -ForegroundColor Yellow
docker-compose up -d mongodb rabbitmq

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Start Auth Service
Write-Host "🔐 Starting Auth Service..." -ForegroundColor Cyan
Set-Location auth-service
Start-Process powershell -ArgumentList "-Command", "npm run start:dev" -WindowStyle Normal
Set-Location ..

# Start Product Service
Write-Host "🛍️ Starting Product Service..." -ForegroundColor Cyan
Set-Location product-service
Start-Process powershell -ArgumentList "-Command", "npm run start:dev" -WindowStyle Normal
Set-Location ..

Write-Host "✅ All services are starting up!" -ForegroundColor Green
Write-Host "📚 API Documentation:" -ForegroundColor White
Write-Host "   - Auth Service: http://localhost:3001/api" -ForegroundColor Gray
Write-Host "   - Product Service: http://localhost:3002/api" -ForegroundColor Gray
Write-Host "🐰 RabbitMQ Management: http://localhost:15672 (admin/password123)" -ForegroundColor Gray
Write-Host "🍃 MongoDB: mongodb://localhost:27017" -ForegroundColor Gray
