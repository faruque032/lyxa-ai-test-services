export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface RabbitMQMessage {
  pattern: string;
  data: any;
}

export interface TokenValidationRequest {
  token: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  user?: AuthUser;
  error?: string;
}

export interface UserCreatedEvent {
  userId: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}
