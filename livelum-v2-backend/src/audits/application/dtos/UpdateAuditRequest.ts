import { AuditType } from '../../domain/enums/AuditEnums';

export interface UpdateAuditRequest {
  title?: string;
  auditType?: AuditType;
  plannedDate?: Date;
  auditorName?: string;
  scope?: string;
}
