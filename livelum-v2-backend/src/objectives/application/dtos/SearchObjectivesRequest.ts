import { ObjectiveStatus } from '../../domain/enums/ObjectiveEnums';

export interface SearchObjectivesRequest {
  title?: string;
  companyId?: string;
  status?: ObjectiveStatus;
  responsibleUserId?: string;
  indicatorId?: string;
  overdue?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'targetDate' | 'createdAt' | 'progress';
  sortOrder?: 'asc' | 'desc';
}
