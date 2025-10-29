import { AuthorizationStatus, AuthorizationType } from '../../../domain/enums/AuthorizationEnums';

export interface AuthorizationSchemaType {
  _id: string;
  type: AuthorizationType;
  entityId: string;
  entityName: string;
  version: string;
  status: AuthorizationStatus;
  requestedBy: string;
  requestedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectedBy?: string;
  rejectedAt?: Date;
  comments?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}
