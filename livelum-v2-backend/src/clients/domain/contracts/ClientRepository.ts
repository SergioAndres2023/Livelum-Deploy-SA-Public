import { Client } from '../entities/Client';
import { ClientSearchCriteria } from '../filters/ClientCriteriaMother';

export interface ClientRepository {
  save(client: Client): Promise<void>;
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByCriteria(criteria: ClientSearchCriteria): Promise<Client[]>;
  update(client: Client): Promise<void>;
  delete(id: string): Promise<void>;
  count(criteria?: ClientSearchCriteria): Promise<number>;
}
