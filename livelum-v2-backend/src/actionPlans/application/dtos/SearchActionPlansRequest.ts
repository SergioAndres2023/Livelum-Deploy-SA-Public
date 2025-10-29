import { ActionPlanOriginType, ActionPlanStatus } from '../../domain/enums/ActionPlanEnums';

export interface SearchActionPlansRequest {
  originType?: ActionPlanOriginType;
  originId?: string;
  status?: ActionPlanStatus;
  companyId?: string;
  createdDateFrom?: Date;
  createdDateTo?: Date;
  minCompletionPercentage?: number;
  maxCompletionPercentage?: number;
  overdueActions?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'createdDate' | 'status' | 'completionPercentage' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
