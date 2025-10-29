export interface CreateObjectiveRequest {
  title: string;
  description: string;
  targetValue: number;
  currentValue?: number;
  unit: string;
  startDate: Date;
  targetDate: Date;
  indicatorId?: string;
  indicatorName?: string;
  responsibleUserId: string;
  responsibleUserName: string;
  companyId: string;
}
