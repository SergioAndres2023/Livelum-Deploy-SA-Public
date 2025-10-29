/**
 * DTO para la actualización de usuarios
 */
export interface UpdateUserRequest {
  username?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  avatar?: string;
}

