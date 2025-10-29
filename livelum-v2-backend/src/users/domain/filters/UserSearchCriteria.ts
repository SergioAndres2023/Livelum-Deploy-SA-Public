import { UserRole, UserStatus } from '../enums/UserEnums';

/**
 * Criterios de búsqueda para Users
 */
export interface UserSearchCriteria {
  username?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  companyId?: string;
  role?: UserRole;
  status?: UserStatus;
  emailVerified?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'username' | 'nombre' | 'apellido' | 'email' | 'createdAt' | 'updatedAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

