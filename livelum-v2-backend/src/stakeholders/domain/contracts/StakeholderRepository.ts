import { Stakeholder } from '../entities/Stakeholder';
import { StakeholderSearchCriteria } from '../filters/StakeholderSearchCriteria';

export interface StakeholderRepository {
  save(stakeholder: Stakeholder): Promise<void>;
  findById(id: string): Promise<Stakeholder | null>;
  findByCriteria(criteria: StakeholderSearchCriteria): Promise<Stakeholder[]>;
  countByCriteria(criteria: StakeholderSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
  getNextNumber(companyId: string): Promise<number>;
}
