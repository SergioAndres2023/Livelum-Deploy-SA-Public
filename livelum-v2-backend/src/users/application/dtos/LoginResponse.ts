import { UserResponse } from './UserResponse';

/**
 * DTO de respuesta para login
 */
export interface LoginResponse {
  user: UserResponse;
  token?: string; // JWT token (opcional por ahora)
  message: string;
}

