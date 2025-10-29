/**
 * Enums del dominio de Findings (Hallazgos)
 */

export enum FindingOrigin {
  CUSTOMER_COMPLAINT = 'CUSTOMER_COMPLAINT',
  INTERNAL_AUDIT = 'INTERNAL_AUDIT',
  EXTERNAL_AUDIT = 'EXTERNAL_AUDIT',
  MANAGEMENT_REVIEW = 'MANAGEMENT_REVIEW',
  PROCESS_MONITORING = 'PROCESS_MONITORING',
  EMPLOYEE_REPORT = 'EMPLOYEE_REPORT',
  SUPPLIER_EVALUATION = 'SUPPLIER_EVALUATION',
  OTHER = 'OTHER',
}

export const FindingOriginLabels: Record<FindingOrigin, string> = {
  [FindingOrigin.CUSTOMER_COMPLAINT]: 'Reclamo de cliente',
  [FindingOrigin.INTERNAL_AUDIT]: 'Auditoría interna',
  [FindingOrigin.EXTERNAL_AUDIT]: 'Auditoría externa',
  [FindingOrigin.MANAGEMENT_REVIEW]: 'Revisión por dirección',
  [FindingOrigin.PROCESS_MONITORING]: 'Seguimiento de proceso',
  [FindingOrigin.EMPLOYEE_REPORT]: 'Reporte de empleado',
  [FindingOrigin.SUPPLIER_EVALUATION]: 'Evaluación de proveedor',
  [FindingOrigin.OTHER]: 'Otro',
};

export enum FindingType {
  IMPROVEMENT_OPPORTUNITY = 'IMPROVEMENT_OPPORTUNITY',
  NON_CONFORMITY = 'NON_CONFORMITY',
  OBSERVATION = 'OBSERVATION',
  CRITICAL_NON_CONFORMITY = 'CRITICAL_NON_CONFORMITY',
}

export const FindingTypeLabels: Record<FindingType, string> = {
  [FindingType.IMPROVEMENT_OPPORTUNITY]: 'Oportunidad de mejora',
  [FindingType.NON_CONFORMITY]: 'No conformidad',
  [FindingType.OBSERVATION]: 'Observación',
  [FindingType.CRITICAL_NON_CONFORMITY]: 'No conformidad crítica',
};

export enum FindingStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  VERIFIED = 'VERIFIED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export const FindingStatusLabels: Record<FindingStatus, string> = {
  [FindingStatus.OPEN]: 'Abierto',
  [FindingStatus.IN_PROGRESS]: 'En progreso',
  [FindingStatus.PENDING_VERIFICATION]: 'Pendiente de verificación',
  [FindingStatus.VERIFIED]: 'Verificado',
  [FindingStatus.CLOSED]: 'Cerrado',
  [FindingStatus.CANCELLED]: 'Cancelado',
};

export enum ActionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE',
}

export const ActionStatusLabels: Record<ActionStatus, string> = {
  [ActionStatus.PLANNED]: 'Prevista',
  [ActionStatus.IN_PROGRESS]: 'En progreso',
  [ActionStatus.COMPLETED]: 'Realizada',
  [ActionStatus.CANCELLED]: 'Cancelada',
  [ActionStatus.OVERDUE]: 'Vencida',
};

export enum ControlStatus {
  NOT_LOADED = 'NOT_LOADED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  NOT_PERFORMED = 'NOT_PERFORMED',
}

export const ControlStatusLabels: Record<ControlStatus, string> = {
  [ControlStatus.NOT_LOADED]: 'No cargado',
  [ControlStatus.PENDING]: 'Pendiente',
  [ControlStatus.COMPLETED]: 'Completado',
  [ControlStatus.NOT_PERFORMED]: 'Aún no realizado',
};

