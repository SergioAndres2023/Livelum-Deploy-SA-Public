export interface UpdateObjectiveRequest {
  title?: string;
  description?: string;
  targetValue?: number;
  unit?: string;
  startDate?: Date;
  targetDate?: Date;
  indicatorId?: string;
  indicatorName?: string;
  responsibleUserId?: string;
  responsibleUserName?: string;
}
