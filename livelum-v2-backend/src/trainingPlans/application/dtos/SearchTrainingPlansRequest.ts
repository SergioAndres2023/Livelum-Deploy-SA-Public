import { TrainingPlanType, TrainingPlanStatus } from '../../domain/enums/TrainingPlanEnums';

export interface SearchTrainingPlansRequest {
  topic?: string;
  type?: TrainingPlanType;
  status?: TrainingPlanStatus;
  companyId?: string;
  plannedDateFrom?: Date;
  plannedDateTo?: Date;
  overdue?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'plannedDate' | 'topic' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
