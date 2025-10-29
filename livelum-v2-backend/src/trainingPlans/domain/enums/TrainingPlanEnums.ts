/**
 * Enums del dominio de TrainingPlans (Planes de Capacitación)
 */

export enum TrainingPlanType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export const TrainingPlanTypeLabels: Record<TrainingPlanType, string> = {
  [TrainingPlanType.INTERNAL]: 'Interna',
  [TrainingPlanType.EXTERNAL]: 'Externa',
};

export enum TrainingPlanStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED_SATISFACTORY = 'COMPLETED_SATISFACTORY',
  COMPLETED_UNSATISFACTORY = 'COMPLETED_UNSATISFACTORY',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE',
}

export const TrainingPlanStatusLabels: Record<TrainingPlanStatus, string> = {
  [TrainingPlanStatus.PENDING]: 'Aún no realizado',
  [TrainingPlanStatus.IN_PROGRESS]: 'En progreso',
  [TrainingPlanStatus.COMPLETED_SATISFACTORY]: 'Realizado - Satisfactorio',
  [TrainingPlanStatus.COMPLETED_UNSATISFACTORY]: 'Realizado - No satisfactorio',
  [TrainingPlanStatus.CANCELLED]: 'Cancelado',
  [TrainingPlanStatus.OVERDUE]: 'Vencido',
};
