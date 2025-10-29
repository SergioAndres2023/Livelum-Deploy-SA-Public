import { Objective } from '../entities/Objective';
import { ObjectiveSearchCriteria } from '../filters/ObjectiveSearchCriteria';

export interface ObjectiveRepository {
  save(objective: Objective): Promise<void>;
  findById(id: string): Promise<Objective | null>;
  findByCriteria(criteria: ObjectiveSearchCriteria): Promise<Objective[]>;
  countByCriteria(criteria: ObjectiveSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}

