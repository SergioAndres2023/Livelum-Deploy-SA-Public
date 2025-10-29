import { OrganizationalLevel } from '../../domain/enums/JobProfileEnums';

export interface UpdateJobProfileRequest {
  name?: string;
  description?: string;
  organizationalChart?: number;
  supervisorUserId?: string;
  supervisorUserName?: string;
  parentJobProfileId?: string;
  parentJobProfileName?: string;
  organizationalLevel?: OrganizationalLevel;
  responsibilities?: string[];
  requirements?: string[];
  competencies?: string[];
}
