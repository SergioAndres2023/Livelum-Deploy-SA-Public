import { UserRole, UserStatus } from '../../../domain/enums/UserEnums';

/**
 * Tipo TypeScript que representa el schema de User en MongoDB
 */
export interface UserSchemaType {
  _id: string;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  companyId: string;
  roles: UserRole[];
  status: UserStatus;
  avatar?: string;
  lastLogin?: Date;
  emailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

