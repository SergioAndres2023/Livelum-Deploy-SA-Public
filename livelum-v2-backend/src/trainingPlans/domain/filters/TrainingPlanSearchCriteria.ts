import { TrainingPlanType, TrainingPlanStatus } from '../enums/TrainingPlanEnums';

export interface TrainingPlanSearchCriteria {
  topic?: string;
  type?: TrainingPlanType;
  status?: TrainingPlanStatus;
  companyId?: string;
  plannedDateFrom?: Date;
  plannedDateTo?: Date;
  overdue?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'plannedDate' | 'topic' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
