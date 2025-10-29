import { AuthorizationStatus, AuthorizationType } from '../../domain/enums/AuthorizationEnums';

export interface SearchAuthorizationsRequest {
  type?: AuthorizationType;
  status?: AuthorizationStatus;
  entityId?: string;
  requestedBy?: string;
  companyId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'requestedAt' | 'entityName' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
