import { UserRole, UserStatus } from '../../domain/enums/UserEnums';

/**
 * DTO para búsqueda de usuarios
 */
export interface SearchUsersRequest {
  username?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  companyId?: string;
  role?: UserRole;
  status?: UserStatus;
  emailVerified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'username' | 'nombre' | 'apellido' | 'email' | 'createdAt' | 'updatedAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

