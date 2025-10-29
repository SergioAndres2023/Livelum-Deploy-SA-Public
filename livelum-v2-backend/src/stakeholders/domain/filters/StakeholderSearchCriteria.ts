import { StakeholderType } from '../enums/StakeholderEnums';

export interface StakeholderSearchCriteria {
  nombre?: string;
  tipo?: StakeholderType;
  companyId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'numero' | 'nombre' | 'tipo' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
