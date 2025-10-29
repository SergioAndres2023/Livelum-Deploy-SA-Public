import { SupplierStatus } from '../enums/SupplierEnums';

export interface SupplierSearchCriteria {
  rubro?: string;
  proveedor?: string;
  estado?: SupplierStatus;
  companyId?: string;
  evaluationOverdue?: boolean;
  minEvaluacion?: number;
  maxEvaluacion?: number;
  limit?: number;
  offset?: number;
  sortBy?: 'rubro' | 'proveedor' | 'evaluacion' | 'ultimaEvaluacion' | 'siguienteEvaluacion' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
