import { Audit } from '../entities/Audit';
import { AuditStatus, AuditType } from '../enums/AuditEnums';

export interface AuditSearchCriteria {
  title?: string;
  auditType?: AuditType;
  status?: AuditStatus;
  auditorName?: string;
  upcoming?: boolean;
  overdue?: boolean;
  completed?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AuditRepository {
  save(audit: Audit): Promise<void>;
  findById(id: string): Promise<Audit | null>;
  findByCriteria(criteria: AuditSearchCriteria): Promise<Audit[]>;
  update(audit: Audit): Promise<void>;
  delete(id: string): Promise<void>;
  countByStatus(status: AuditStatus): Promise<number>;
  countByType(type: AuditType): Promise<number>;
  countTotal(): Promise<number>;
  findUpcoming(daysAhead: number): Promise<Audit[]>;
  findOverdue(): Promise<Audit[]>;
}
