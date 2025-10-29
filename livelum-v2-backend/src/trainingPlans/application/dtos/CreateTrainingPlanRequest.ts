import { TrainingPlanType } from '../../domain/enums/TrainingPlanEnums';

export interface CreateTrainingPlanRequest {
  plannedDate: Date;
  topic: string;
  type: TrainingPlanType;
  instructor?: string;
  provider?: string;
  duration?: number;
  participants?: string[];
  participantIds?: string[];
  objectives?: string;
  companyId: string;
}
