import { TrainingPlan } from '../entities/TrainingPlan';
import { TrainingPlanSearchCriteria } from '../filters/TrainingPlanSearchCriteria';

export interface TrainingPlanRepository {
  save(trainingPlan: TrainingPlan): Promise<void>;
  findById(id: string): Promise<TrainingPlan | null>;
  findByCriteria(criteria: TrainingPlanSearchCriteria): Promise<TrainingPlan[]>;
  countByCriteria(criteria: TrainingPlanSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
