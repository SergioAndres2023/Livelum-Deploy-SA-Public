import { UserRole, UserStatus } from '../../domain/enums/UserEnums';

/**
 * DTO de respuesta para usuarios
 * No incluye información sensible como password
 */
export interface UserResponse {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  fullName: string;
  email: string;
  telefono?: string;
  companyId: string;
  roles: UserRole[];
  status: UserStatus;
  avatar?: string;
  lastLogin?: Date;
  emailVerified: boolean;
  isActive: boolean;
  isInactive: boolean;
  isPending: boolean;
  isSuspended: boolean;
  isAdmin: boolean;
  isConsultor: boolean;
  createdAt: Date;
  updatedAt: Date;
}

