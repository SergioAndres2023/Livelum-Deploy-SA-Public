import { ProcessSheet } from '../entities/ProcessSheet';
import { ProcessStatus } from '../enums/ProcessEnums';

export interface ProcessSheetSearchCriteria {
  name?: string;
  code?: string;
  processTypeId?: string;
  processNameId?: string;
  status?: ProcessStatus;
  responsible?: string;
  latestVersions?: boolean;
  withVersionHistory?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProcessSheetRepository {
  save(sheet: ProcessSheet): Promise<void>;
  findById(id: string): Promise<ProcessSheet | null>;
  findByCode(code: string): Promise<ProcessSheet | null>;
  findByCriteria(criteria: ProcessSheetSearchCriteria): Promise<ProcessSheet[]>;
  findLatestVersionByName(processNameId: string): Promise<ProcessSheet | null>;
  findAllVersionsByName(processNameId: string): Promise<ProcessSheet[]>;
  findByProcessTypeId(processTypeId: string): Promise<ProcessSheet[]>;
  findByStatus(status: ProcessStatus): Promise<ProcessSheet[]>;
  update(sheet: ProcessSheet): Promise<void>;
  delete(id: string): Promise<void>;
  countByStatus(status: ProcessStatus): Promise<number>;
  countByProcessTypeId(processTypeId: string): Promise<number>;
  countByProcessNameId(processNameId: string): Promise<number>;
  countTotal(): Promise<number>;
}
