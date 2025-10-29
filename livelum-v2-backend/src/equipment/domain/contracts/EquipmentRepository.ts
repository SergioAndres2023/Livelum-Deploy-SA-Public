import { Equipment } from '../entities/Equipment';
import { EquipmentSearchCriteria } from '../filters/EquipmentSearchCriteria';

export interface EquipmentRepository {
  save(equipment: Equipment): Promise<void>;
  findById(id: string): Promise<Equipment | null>;
  findBySerialNumber(serialNumber: string, companyId: string): Promise<Equipment | null>;
  findByCode(code: string, companyId: string): Promise<Equipment | null>;
  findByCriteria(criteria: EquipmentSearchCriteria): Promise<Equipment[]>;
  countByCriteria(criteria: EquipmentSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
