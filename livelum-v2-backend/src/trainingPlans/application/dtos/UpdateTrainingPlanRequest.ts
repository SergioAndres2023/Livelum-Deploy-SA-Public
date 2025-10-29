import { TrainingPlanType } from '../../domain/enums/TrainingPlanEnums';

export interface UpdateTrainingPlanRequest {
  topic?: string;
  plannedDate?: Date;
  type?: TrainingPlanType;
  instructor?: string;
  provider?: string;
  duration?: number;
  participants?: string[];
  participantIds?: string[];
  objectives?: string;
}
