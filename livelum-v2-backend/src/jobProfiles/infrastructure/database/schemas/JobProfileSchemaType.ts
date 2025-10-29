import { JobProfileStatus, OrganizationalLevel } from '../../../domain/enums/JobProfileEnums';

export interface JobProfileSchemaType {
  _id: string;
  organizationalChart: number;
  name: string;
  description: string;
  supervisorUserId?: string;
  supervisorUserName?: string;
  parentJobProfileId?: string;
  parentJobProfileName?: string;
  organizationalLevel: OrganizationalLevel;
  status: JobProfileStatus;
  responsibilities: string[];
  requirements: string[];
  competencies: string[];
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

