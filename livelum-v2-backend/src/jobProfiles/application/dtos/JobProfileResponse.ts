import { JobProfileStatus, OrganizationalLevel } from '../../domain/enums/JobProfileEnums';

export interface JobProfileResponse {
  id: string;
  organizationalChart: number;
  name: string;
  description: string;
  supervisorUserId?: string;
  supervisorUserName?: string;
  parentJobProfileId?: string;
  parentJobProfileName?: string;
  organizationalLevel: OrganizationalLevel;
  status: JobProfileStatus;
  responsibilities?: string[];
  requirements?: string[];
  competencies?: string[];
  companyId: string;
  isActive: boolean;
  isInactive: boolean;
  isDraft: boolean;
  hasParent: boolean;
  hasSupervisor: boolean;
  createdAt: Date;
  updatedAt: Date;
}
