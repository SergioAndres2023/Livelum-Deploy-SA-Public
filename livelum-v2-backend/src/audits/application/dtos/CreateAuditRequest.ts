import { AuditType } from '../../domain/enums/AuditEnums';

export interface CreateAuditRequest {
  title: string;
  auditType: AuditType;
  plannedDate: Date;
  auditorName: string;
  scope: string;
}
