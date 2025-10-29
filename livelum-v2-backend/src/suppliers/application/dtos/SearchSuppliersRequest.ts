import { SupplierStatus } from '../../domain/enums/SupplierEnums';

export interface SearchSuppliersRequest {
  rubro?: string;
  proveedor?: string;
  estado?: SupplierStatus;
  companyId?: string;
  evaluationOverdue?: boolean;
  minEvaluacion?: number;
  maxEvaluacion?: number;
  page?: number;
  limit?: number;
  sortBy?: 'rubro' | 'proveedor' | 'evaluacion' | 'ultimaEvaluacion' | 'siguienteEvaluacion' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
