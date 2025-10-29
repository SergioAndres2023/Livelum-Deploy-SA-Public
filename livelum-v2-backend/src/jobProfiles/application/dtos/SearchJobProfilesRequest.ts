import { JobProfileStatus, OrganizationalLevel } from '../../domain/enums/JobProfileEnums';

export interface SearchJobProfilesRequest {
  name?: string;
  status?: JobProfileStatus;
  organizationalLevel?: OrganizationalLevel;
  parentJobProfileId?: string;
  supervisorUserId?: string;
  companyId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'organizationalChart' | 'organizationalLevel' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
