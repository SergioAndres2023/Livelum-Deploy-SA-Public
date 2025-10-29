/**
 * Enums del dominio de Objectives
 */

export enum ObjectiveStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
}

export const ObjectiveStatusLabels: Record<ObjectiveStatus, string> = {
  [ObjectiveStatus.ACTIVE]: 'Activo',
  [ObjectiveStatus.COMPLETED]: 'Completado',
  [ObjectiveStatus.PAUSED]: 'Pausado',
  [ObjectiveStatus.CANCELLED]: 'Cancelado',
};

export enum ActionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const ActionStatusLabels: Record<ActionStatus, string> = {
  [ActionStatus.PENDING]: 'Pendiente',
  [ActionStatus.IN_PROGRESS]: 'En Progreso',
  [ActionStatus.COMPLETED]: 'Completada',
  [ActionStatus.CANCELLED]: 'Cancelada',
};

