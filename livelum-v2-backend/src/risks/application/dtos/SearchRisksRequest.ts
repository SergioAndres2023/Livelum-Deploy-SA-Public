import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../domain/enums/RiskEnums';

export interface SearchRisksRequest {
  title?: string;
  code?: string;
  category?: RiskCategory;
  probability?: RiskProbability;
  impact?: RiskImpact;
  riskLevel?: RiskLevel;
  status?: RiskStatus;
  owner?: string;
  isOverdue?: boolean;
  isCritical?: boolean;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'code' | 'riskLevel' | 'dueDate' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
