import { Minute } from '../entities/Minute';
import { MinuteSearchCriteria } from '../filters/MinuteSearchCriteria';

export interface MinuteRepository {
  save(minute: Minute): Promise<void>;
  findById(id: string): Promise<Minute | null>;
  findByCriteria(criteria: MinuteSearchCriteria): Promise<Minute[]>;
  countByCriteria(criteria: MinuteSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
