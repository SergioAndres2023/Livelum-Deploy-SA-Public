import { UserRole } from '../../domain/enums/UserEnums';

/**
 * DTO para la creación de usuarios
 */
export interface CreateUserRequest {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  companyId: string;
  roles?: UserRole[];
  avatar?: string;
}

