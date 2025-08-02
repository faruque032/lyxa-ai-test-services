export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
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
