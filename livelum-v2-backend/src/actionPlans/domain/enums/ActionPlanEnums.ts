/**
 * Enums del dominio de ActionPlans (Planes de Acción)
 */

export enum ActionPlanOriginType {
  FINDING = 'FINDING',
  OBJECTIVE = 'OBJECTIVE',
  RISK = 'RISK',
  MANAGEMENT_REVIEW = 'MANAGEMENT_REVIEW',
  AUDIT = 'AUDIT',
  OTHER = 'OTHER',
}

export const ActionPlanOriginTypeLabels: Record<ActionPlanOriginType, string> = {
  [ActionPlanOriginType.FINDING]: 'Hallazgo',
  [ActionPlanOriginType.OBJECTIVE]: 'Objetivo',
  [ActionPlanOriginType.RISK]: 'Riesgo',
  [ActionPlanOriginType.MANAGEMENT_REVIEW]: 'Revisión por Dirección',
  [ActionPlanOriginType.AUDIT]: 'Auditoría',
  [ActionPlanOriginType.OTHER]: 'Otro',
};

export enum ActionPlanStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE',
}

export const ActionPlanStatusLabels: Record<ActionPlanStatus, string> = {
  [ActionPlanStatus.PENDING]: 'Pendiente',
  [ActionPlanStatus.IN_PROGRESS]: 'En progreso',
  [ActionPlanStatus.COMPLETED]: 'Completado',
  [ActionPlanStatus.CANCELLED]: 'Cancelado',
  [ActionPlanStatus.OVERDUE]: 'Vencido',
};

export enum PlanActionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const PlanActionStatusLabels: Record<PlanActionStatus, string> = {
  [PlanActionStatus.PLANNED]: 'Prevista',
  [PlanActionStatus.IN_PROGRESS]: 'En progreso',
  [PlanActionStatus.COMPLETED]: 'Realizada',
  [PlanActionStatus.CANCELLED]: 'Cancelada',
};

export enum PlanControlStatus {
  ESTIMATED = 'ESTIMATED',
  NOT_LOADED = 'NOT_LOADED',
  SATISFACTORY = 'SATISFACTORY',
  NOT_PERFORMED = 'NOT_PERFORMED',
  UNSATISFACTORY = 'UNSATISFACTORY',
}

export const PlanControlStatusLabels: Record<PlanControlStatus, string> = {
  [PlanControlStatus.ESTIMATED]: 'Estimado',
  [PlanControlStatus.NOT_LOADED]: 'No cargado',
  [PlanControlStatus.SATISFACTORY]: 'Satisfactorio',
  [PlanControlStatus.NOT_PERFORMED]: 'Aún no realizado',
  [PlanControlStatus.UNSATISFACTORY]: 'No satisfactorio',
};

