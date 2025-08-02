# API Documentation

## Overview

This document provides detailed information about the APIs exposed by both microservices in the Lyxa AI Test Services system.

## Base URLs

- **Auth Service**: `http://localhost:3001`
- **Product Service**: `http://localhost:3002`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Auth Service API

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### User Management Endpoints

#### GET /users
Get all users (requires authentication).

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "isEmailVerified": false,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /users/:id
Get user by ID (requires authentication).

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isActive": true,
  "isEmailVerified": false,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Product Service API

### Product Management Endpoints

#### POST /products
Create a new product (requires authentication).

**Headers:**
```
Authorization: Bearer <access-token>
```

**Request Body:**
```json
{
  "name": "MacBook Pro",
  "description": "High-performance laptop for professionals",
  "price": 1999.99,
  "category": "Electronics",
  "stock": 10,
  "images": ["https://example.com/image1.jpg"],
  "tags": ["laptop", "apple", "professional"]
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "MacBook Pro",
  "description": "High-performance laptop for professionals",
  "price": 1999.99,
  "category": "Electronics",
  "stock": 10,
  "images": ["https://example.com/image1.jpg"],
  "tags": ["laptop", "apple", "professional"],
  "userId": "507f1f77bcf86cd799439011",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### GET /products
Get all products (public endpoint).

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "MacBook Pro",
    "description": "High-performance laptop for professionals",
    "price": 1999.99,
    "category": "Electronics",
    "stock": 10,
    "images": ["https://example.com/image1.jpg"],
    "tags": ["laptop", "apple", "professional"],
    "userId": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /products/:id
Get product by ID (public endpoint).

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "MacBook Pro",
  "description": "High-performance laptop for professionals",
  "price": 1999.99,
  "category": "Electronics",
  "stock": 10,
  "images": ["https://example.com/image1.jpg"],
  "tags": ["laptop", "apple", "professional"],
  "userId": "507f1f77bcf86cd799439011",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### PATCH /products/:id
Update product (requires authentication and ownership).

**Headers:**
```
Authorization: Bearer <access-token>
```

**Request Body:**
```json
{
  "name": "MacBook Pro 16-inch",
  "price": 2499.99,
  "stock": 5
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "MacBook Pro 16-inch",
  "description": "High-performance laptop for professionals",
  "price": 2499.99,
  "category": "Electronics",
  "stock": 5,
  "images": ["https://example.com/image1.jpg"],
  "tags": ["laptop", "apple", "professional"],
  "userId": "507f1f77bcf86cd799439011",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

#### DELETE /products/:id
Delete product (requires authentication and ownership).

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

#### GET /products/my-products
Get current user's products (requires authentication).

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "MacBook Pro",
    "description": "High-performance laptop for professionals",
    "price": 1999.99,
    "category": "Electronics",
    "stock": 10,
    "images": ["https://example.com/image1.jpg"],
    "tags": ["laptop", "apple", "professional"],
    "userId": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /products/search?q={query}
Search products by name, description, category, or tags.

**Query Parameters:**
- `q` (required): Search query string

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "MacBook Pro",
    "description": "High-performance laptop for professionals",
    "price": 1999.99,
    "category": "Electronics",
    "stock": 10,
    "images": ["https://example.com/image1.jpg"],
    "tags": ["laptop", "apple", "professional"],
    "userId": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /products/category/:category
Get products by category.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "MacBook Pro",
    "description": "High-performance laptop for professionals",
    "price": 1999.99,
    "category": "Electronics",
    "stock": 10,
    "images": ["https://example.com/image1.jpg"],
    "tags": ["laptop", "apple", "professional"],
    "userId": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

## Health Check Endpoints

Both services provide health check endpoints:

- **Auth Service**: `GET /health`
- **Product Service**: `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "service": "auth-service"
}
```

## Error Responses

All endpoints return standard HTTP status codes with error details:

**400 Bad Request:**
```json
{
  "statusCode": 400,
  "message": ["Validation error messages"],
  "error": "Bad Request"
}
```

**401 Unauthorized:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**403 Forbidden:**
```json
{
  "statusCode": 403,
  "message": "You can only update your own products",
  "error": "Forbidden"
}
```

**404 Not Found:**
```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

**409 Conflict:**
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## RabbitMQ Integration

The services communicate via RabbitMQ using the following message patterns:

### Token Validation
- **Pattern**: `auth.validate.token`
- **Request**: `{ token: string }`
- **Response**: `{ valid: boolean, user?: AuthUser }`

### User Created Event
- **Pattern**: `user.created`
- **Payload**: `{ userId: string, email: string, name: string, role: string, createdAt: Date }`
