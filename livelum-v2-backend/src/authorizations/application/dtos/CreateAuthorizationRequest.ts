import { AuthorizationType } from '../../domain/enums/AuthorizationEnums';

export interface CreateAuthorizationRequest {
  type: AuthorizationType;
  entityId: string;
  entityName: string;
  version: string;
  requestedBy: string;
  comments?: string;
  companyId: string;
}
