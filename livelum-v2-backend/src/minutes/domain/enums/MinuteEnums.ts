/**
 * Enums del dominio de Minutes (Actas/Minutas)
 */

export enum MinuteType {
  MANAGEMENT_REVIEW = 'MANAGEMENT_REVIEW',
  COMMITTEE_MEETING = 'COMMITTEE_MEETING',
  QUALITY_REVIEW = 'QUALITY_REVIEW',
  AUDIT_MEETING = 'AUDIT_MEETING',
  PLANNING_MEETING = 'PLANNING_MEETING',
  GENERAL_MEETING = 'GENERAL_MEETING',
  OTHER = 'OTHER',
}

export const MinuteTypeLabels: Record<MinuteType, string> = {
  [MinuteType.MANAGEMENT_REVIEW]: 'Revisión por Dirección',
  [MinuteType.COMMITTEE_MEETING]: 'Comité',
  [MinuteType.QUALITY_REVIEW]: 'Revisión de Calidad',
  [MinuteType.AUDIT_MEETING]: 'Auditoría',
  [MinuteType.PLANNING_MEETING]: 'Planificación',
  [MinuteType.GENERAL_MEETING]: 'Reunión General',
  [MinuteType.OTHER]: 'Otra',
};

export enum MinuteStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  APPROVED = 'APPROVED',
  ARCHIVED = 'ARCHIVED',
}

export const MinuteStatusLabels: Record<MinuteStatus, string> = {
  [MinuteStatus.DRAFT]: 'Borrador',
  [MinuteStatus.PUBLISHED]: 'Publicada',
  [MinuteStatus.APPROVED]: 'Aprobada',
  [MinuteStatus.ARCHIVED]: 'Archivada',
};
