import { AuthorizationStatus, AuthorizationType } from '../enums/AuthorizationEnums';

export interface AuthorizationSearchCriteria {
  type?: AuthorizationType;
  status?: AuthorizationStatus;
  entityId?: string;
  requestedBy?: string;
  companyId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'requestedAt' | 'entityName' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
