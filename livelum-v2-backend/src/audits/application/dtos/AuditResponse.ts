import { AuditType, AuditStatus } from '../../domain/enums/AuditEnums';

export interface AuditResponse {
  id: string;
  title: string;
  auditType: AuditType;
  status: AuditStatus;
  plannedDate: Date;
  actualDate?: Date;
  auditorName: string;
  scope: string;
  findings?: string;
  recommendations?: string;
  createdAt: Date;
  updatedAt: Date;
  isOverdue: boolean;
  isUpcoming: boolean;
  daysUntilPlanned: number;
  daysOverdue: number;
}

export interface AuditStatsResponse {
  total: number;
  planned: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  overdue: number;
  upcoming: number;
  byType: {
    [key in AuditType]: number;
  };
}
