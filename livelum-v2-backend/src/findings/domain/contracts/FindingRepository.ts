import { Finding } from '../entities/Finding';
import { FindingSearchCriteria } from '../filters/FindingSearchCriteria';

export interface FindingRepository {
  save(finding: Finding): Promise<void>;
  findById(id: string): Promise<Finding | null>;
  findByCriteria(criteria: FindingSearchCriteria): Promise<Finding[]>;
  countByCriteria(criteria: FindingSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
