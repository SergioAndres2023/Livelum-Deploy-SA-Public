import { ActionPlan } from '../entities/ActionPlan';
import { ActionPlanSearchCriteria } from '../filters/ActionPlanSearchCriteria';

export interface ActionPlanRepository {
  save(actionPlan: ActionPlan): Promise<void>;
  findById(id: string): Promise<ActionPlan | null>;
  findByCriteria(criteria: ActionPlanSearchCriteria): Promise<ActionPlan[]>;
  countByCriteria(criteria: ActionPlanSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
