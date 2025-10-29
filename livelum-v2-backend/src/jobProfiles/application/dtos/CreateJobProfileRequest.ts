import { OrganizationalLevel } from '../../domain/enums/JobProfileEnums';

export interface CreateJobProfileRequest {
  organizationalChart: number;
  name: string;
  description: string;
  supervisorUserId?: string;
  supervisorUserName?: string;
  parentJobProfileId?: string;
  parentJobProfileName?: string;
  organizationalLevel: OrganizationalLevel;
  responsibilities?: string[];
  requirements?: string[];
  competencies?: string[];
  companyId: string;
}
