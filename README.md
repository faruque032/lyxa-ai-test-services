# Lyxa AI Test Services - Microservices Architecture

A microservices architecture implementation with Auth and Product services using NestJS, RabbitMQ, and MongoDB.

## 🏗️ Architecture Overview

This project consists of two independent microservices:

1. **Auth Service** - Handles user authentication, authorization, and JWT token management
2. **Product Service** - Manages product catalog with user-based authorization

### Communication Flow

```
Client -> Auth Service -> JWT Token
Client -> Product Service -> RabbitMQ -> Auth Service (Token Validation)
Auth Service -> RabbitMQ -> Product Service (User Events)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB
- RabbitMQ

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lyxa-ai-test-services
   ```

2. **Environment Configuration**
   
   Copy the example environment files:
   ```bash
   cp auth-service/.env.example auth-service/.env
   cp product-service/.env.example product-service/.env
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - MongoDB (port 27017)
   - RabbitMQ (port 5672, Management UI: 15672)
   - Auth Service (port 3001)
   - Product Service (port 3002)

4. **Run Services Individually (Development)**

   **Auth Service:**
   ```bash
   cd auth-service
   npm install
   npm run start:dev
   ```

   **Product Service:**
   ```bash
   cd product-service
   npm install
   npm run start:dev
   ```

## 🔧 Configuration

### Auth Service Environment Variables

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/auth-service
RABBITMQ_URL=amqp://localhost:5672
JWT_SECRET=your-jwt-secret-here
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

### Product Service Environment Variables

```env
NODE_ENV=development
PORT=3002
MONGODB_URI=mongodb://localhost:27017/product-service
RABBITMQ_URL=amqp://localhost:5672
AUTH_SERVICE_QUEUE=auth.validation
```

## 📚 API Documentation

### Auth Service Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `POST /auth/validate` - Validate JWT token (internal)

### Product Service Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product (authenticated)
- `PUT /products/:id` - Update product (owner only)
- `DELETE /products/:id` - Delete product (owner only)

## 🔄 Inter-Service Communication

### RabbitMQ Message Patterns

1. **Token Validation**
   ```typescript
   Pattern: 'auth.validate.token'
   Payload: { token: string }
   Response: { valid: boolean, user?: UserData }
   ```

2. **User Created Event**
   ```typescript
   Pattern: 'user.created'
   Payload: { userId: string, email: string, name: string }
   ```

## 🧪 Testing

Run tests for each service:

```bash
# Auth Service
cd auth-service
npm run test

# Product Service
cd product-service
npm run test
```

## 🐳 Docker

### Build Individual Services

```bash
# Auth Service
docker build -t auth-service ./auth-service

# Product Service
docker build -t product-service ./product-service
```

### Docker Compose Services

- **mongodb**: MongoDB database
- **rabbitmq**: RabbitMQ message broker
- **auth-service**: Authentication microservice
- **product-service**: Product management microservice

## 📁 Project Structure

```
lyxa-ai-test-services/
├── auth-service/
│   ├── src/
│   │   ├── modules/
│   │   ├── common/
│   │   ├── config/
│   │   └── main.ts
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── product-service/
│   ├── src/
│   │   ├── modules/
│   │   ├── common/
│   │   ├── config/
│   │   └── main.ts
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## 🔒 Security Features

- JWT access & refresh tokens
- Password hashing with bcrypt
- Role-based authorization
- Request rate limiting
- Input validation and sanitization

## 🚀 Deployment

For production deployment, consider:

1. Environment-specific configurations
2. Database clustering
3. RabbitMQ clustering
4. Load balancing
5. SSL/TLS certificates
6. Monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
