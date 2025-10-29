import { CompanyStatus } from '../enums/CompanyEnums';

/**
 * Criterios de búsqueda para Companies
 */
export interface CompanySearchCriteria {
  razonSocial?: string;
  nombreFantasia?: string;
  cuit?: string;
  ciudad?: string;
  provincia?: string;
  status?: CompanyStatus;
  limit?: number;
  offset?: number;
  sortBy?: 'razonSocial' | 'nombreFantasia' | 'cuit' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

