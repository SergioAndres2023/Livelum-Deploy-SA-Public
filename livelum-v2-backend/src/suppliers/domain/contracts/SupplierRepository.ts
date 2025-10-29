import { Supplier } from '../entities/Supplier';
import { SupplierSearchCriteria } from '../filters/SupplierSearchCriteria';

export interface SupplierRepository {
  save(supplier: Supplier): Promise<void>;
  findById(id: string): Promise<Supplier | null>;
  findByCriteria(criteria: SupplierSearchCriteria): Promise<Supplier[]>;
  countByCriteria(criteria: SupplierSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
