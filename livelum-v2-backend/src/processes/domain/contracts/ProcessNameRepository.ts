import { ProcessName } from '../entities/ProcessName';

export interface ProcessNameRepository {
  save(name: ProcessName): Promise<void>;
  findById(id: string): Promise<ProcessName | null>;
  findByTypeId(typeId: string): Promise<ProcessName[]>;
  findAll(): Promise<ProcessName[]>;
  findByOrder(): Promise<ProcessName[]>;
  findByName(name: string): Promise<ProcessName | null>;
  findByTypeIdAndOrder(typeId: string, order: number): Promise<ProcessName | null>;
  update(name: ProcessName): Promise<void>;
  delete(id: string): Promise<void>;
  countByTypeId(typeId: string): Promise<number>;
  countTotal(): Promise<number>;
}
