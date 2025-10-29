/**
 * Enums del dominio de Authorizations (Autorizaciones)
 */

export enum AuthorizationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export const AuthorizationStatusLabels: Record<AuthorizationStatus, string> = {
  [AuthorizationStatus.PENDING]: 'Pendiente',
  [AuthorizationStatus.APPROVED]: 'Aprobado',
  [AuthorizationStatus.REJECTED]: 'Rechazado',
  [AuthorizationStatus.CANCELLED]: 'Cancelado',
};

export enum AuthorizationType {
  PROCESS = 'PROCESS',
  DOCUMENT = 'DOCUMENT',
  CHANGE = 'CHANGE',
  RISK = 'RISK',
  OTHER = 'OTHER',
}

export const AuthorizationTypeLabels: Record<AuthorizationType, string> = {
  [AuthorizationType.PROCESS]: 'Proceso',
  [AuthorizationType.DOCUMENT]: 'Documento',
  [AuthorizationType.CHANGE]: 'Cambio',
  [AuthorizationType.RISK]: 'Riesgo',
  [AuthorizationType.OTHER]: 'Otro',
};
