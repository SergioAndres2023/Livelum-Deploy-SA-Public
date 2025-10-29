import { StakeholderType } from '../../domain/enums/StakeholderEnums';

export interface SearchStakeholdersRequest {
  nombre?: string;
  tipo?: StakeholderType;
  companyId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'numero' | 'nombre' | 'tipo' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
