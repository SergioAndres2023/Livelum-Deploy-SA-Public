import { JobProfileStatus, OrganizationalLevel } from '../enums/JobProfileEnums';

export interface JobProfileSearchCriteria {
  name?: string;
  status?: JobProfileStatus;
  organizationalLevel?: OrganizationalLevel;
  parentJobProfileId?: string;
  supervisorUserId?: string;
  companyId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'organizationalChart' | 'organizationalLevel' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
