import { FindingOrigin, FindingType, FindingStatus } from '../../domain/enums/FindingEnums';

export interface SearchFindingsRequest {
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
  page?: number;
  limit?: number;
  sortBy?: 'detectionDate' | 'emissionDate' | 'status' | 'type' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
