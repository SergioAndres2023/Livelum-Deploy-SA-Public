import { TrainingPlanType, TrainingPlanStatus } from '../../domain/enums/TrainingPlanEnums';

export interface TrainingPlanResponse {
  id: string;
  plannedDate: Date;
  topic: string;
  type: TrainingPlanType;
  completionDate?: Date;
  status: TrainingPlanStatus;
  instructor?: string;
  provider?: string;
  duration?: number;
  participants?: string[];
  participantIds?: string[];
  objectives?: string;
  evaluation?: string;
  comments?: string;
  companyId: string;
  isPending: boolean;
  isInProgress: boolean;
  isCompleted: boolean;
  isOverdue: boolean;
  createdAt: Date;
  updatedAt: Date;
}
