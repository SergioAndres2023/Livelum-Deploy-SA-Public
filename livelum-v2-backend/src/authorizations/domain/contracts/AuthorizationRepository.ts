import { Authorization } from '../entities/Authorization';
import { AuthorizationSearchCriteria } from '../filters/AuthorizationSearchCriteria';

export interface AuthorizationRepository {
  save(authorization: Authorization): Promise<void>;
  findById(id: string): Promise<Authorization | null>;
  findByCriteria(criteria: AuthorizationSearchCriteria): Promise<Authorization[]>;
  countByCriteria(criteria: AuthorizationSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
