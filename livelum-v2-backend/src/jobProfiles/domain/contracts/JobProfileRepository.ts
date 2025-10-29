import { JobProfile } from '../entities/JobProfile';
import { JobProfileSearchCriteria } from '../filters/JobProfileSearchCriteria';

export interface JobProfileRepository {
  save(jobProfile: JobProfile): Promise<void>;
  findById(id: string): Promise<JobProfile | null>;
  findByCriteria(criteria: JobProfileSearchCriteria): Promise<JobProfile[]>;
  countByCriteria(criteria: JobProfileSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
