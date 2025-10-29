import { SupplierStatus } from '../../domain/enums/SupplierEnums';
import { SupplierContactProps } from '../../domain/valueObjects/SupplierContact';

export interface SupplierResponse {
  id: string;
  rubro: string;
  proveedor: string;
  contacto: SupplierContactProps;
  ultimaEvaluacion?: Date;
  siguienteEvaluacion?: Date;
  estado: SupplierStatus;
  evaluacion: number;
  companyId: string;
  isApproved: boolean;
  isConditional: boolean;
  isNotApproved: boolean;
  isEvaluationOverdue: boolean;
  daysUntilNextEvaluation: number | null;
  createdAt: Date;
  updatedAt: Date;
}
