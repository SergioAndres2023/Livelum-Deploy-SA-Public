import { CompanyStatus } from '../../domain/enums/CompanyEnums';

/**
 * DTO para búsqueda de empresas
 */
export interface SearchCompaniesRequest {
  razonSocial?: string;
  nombreFantasia?: string;
  cuit?: string;
  ciudad?: string;
  provincia?: string;
  status?: CompanyStatus;
  page?: number;
  limit?: number;
  sortBy?: 'razonSocial' | 'nombreFantasia' | 'cuit' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

