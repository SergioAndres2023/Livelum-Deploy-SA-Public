/**
 * DTO para reseteo de contraseña
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

