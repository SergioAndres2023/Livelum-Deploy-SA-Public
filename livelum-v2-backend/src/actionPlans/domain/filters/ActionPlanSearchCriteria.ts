import { ActionPlanOriginType, ActionPlanStatus } from '../enums/ActionPlanEnums';

export interface ActionPlanSearchCriteria {
  originType?: ActionPlanOriginType;
  originId?: string;
  status?: ActionPlanStatus;
  companyId?: string;
  createdDateFrom?: Date;
  createdDateTo?: Date;
  minCompletionPercentage?: number;
  maxCompletionPercentage?: number;
  overdueActions?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'createdDate' | 'status' | 'completionPercentage' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
