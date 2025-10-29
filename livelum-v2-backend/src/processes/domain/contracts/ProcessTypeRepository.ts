import { ProcessType } from '../entities/ProcessType';

export interface ProcessTypeRepository {
  save(type: ProcessType): Promise<void>;
  findById(id: string): Promise<ProcessType | null>;
  findAll(): Promise<ProcessType[]>;
  findByOrder(): Promise<ProcessType[]>;
  findByName(name: string): Promise<ProcessType | null>;
  findByOrderValue(order: number): Promise<ProcessType | null>;
  update(type: ProcessType): Promise<void>;
  delete(id: string): Promise<void>;
  countTotal(): Promise<number>;
}
