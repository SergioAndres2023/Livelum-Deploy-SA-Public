import { PersonStatus, ContractType } from '../enums/PersonEnums';

/**
 * Criterios de búsqueda para People
 */
export interface PersonSearchCriteria {
  username?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  documento?: string;
  companyId?: string;
  status?: PersonStatus;
  contractType?: ContractType;
  department?: string;
  position?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'username' | 'nombre' | 'apellido' | 'email' | 'documento' | 'createdAt' | 'updatedAt' | 'hireDate';
  sortOrder?: 'asc' | 'desc';
}

