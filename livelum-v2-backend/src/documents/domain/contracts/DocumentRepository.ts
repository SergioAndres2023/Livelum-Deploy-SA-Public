import { Document } from '../entities/Document';
import { DocumentStatus } from '../enums/DocumentEnums';

export interface DocumentSearchCriteria {
  title?: string;
  code?: string;
  type?: string;
  status?: DocumentStatus;
  author?: string;
  expiringSoon?: boolean;
  expired?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DocumentRepository {
  save(document: Document): Promise<void>;
  findById(id: string): Promise<Document | null>;
  findByCode(code: string): Promise<Document | null>;
  findByCriteria(criteria: DocumentSearchCriteria): Promise<Document[]>;
  update(document: Document): Promise<void>;
  delete(id: string): Promise<void>;
  countByStatus(status: DocumentStatus): Promise<number>;
  countTotal(): Promise<number>;
  findExpiringSoon(daysThreshold: number): Promise<Document[]>;
  findExpired(): Promise<Document[]>;
}
