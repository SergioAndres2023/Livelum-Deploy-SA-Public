import { FindingOrigin, FindingType, FindingStatus } from '../enums/FindingEnums';

export interface FindingSearchCriteria {
  summary?: string;
  origin?: FindingOrigin;
  type?: FindingType;
  status?: FindingStatus;
  processId?: string;
  companyId?: string;
  detectionDateFrom?: Date;
  detectionDateTo?: Date;
  overdueActions?: boolean;
  overdueControls?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'detectionDate' | 'emissionDate' | 'status' | 'type' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
