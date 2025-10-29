import { PersonStatus, ContractType } from '../../domain/enums/PersonEnums';

/**
 * DTO para búsqueda de personas
 */
export interface SearchPeopleRequest {
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
  page?: number;
  limit?: number;
  sortBy?: 'username' | 'nombre' | 'apellido' | 'email' | 'documento' | 'createdAt' | 'updatedAt' | 'hireDate';
  sortOrder?: 'asc' | 'desc';
}

