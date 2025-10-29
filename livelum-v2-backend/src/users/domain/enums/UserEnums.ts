/**
 * Enums del dominio de Users
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  CONSULTOR = 'CONSULTOR',
  EDITOR_ONBOARDINGS = 'EDITOR_ONBOARDINGS',
  VIEWER = 'VIEWER',
}

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.CONSULTOR]: 'Consultor',
  [UserRole.EDITOR_ONBOARDINGS]: 'Editor de Onboardings',
  [UserRole.VIEWER]: 'Visualizador',
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

export const UserStatusLabels: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'Activo',
  [UserStatus.INACTIVE]: 'Inactivo',
  [UserStatus.PENDING]: 'Pendiente',
  [UserStatus.SUSPENDED]: 'Suspendido',
};

