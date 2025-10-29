import { ObjectiveStatus } from '../enums/ObjectiveEnums';

export interface ObjectiveSearchCriteria {
  title?: string;
  companyId?: string;
  status?: ObjectiveStatus;
  responsibleUserId?: string;
  indicatorId?: string;
  overdue?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'title' | 'targetDate' | 'createdAt' | 'progress';
  sortOrder?: 'asc' | 'desc';
}

