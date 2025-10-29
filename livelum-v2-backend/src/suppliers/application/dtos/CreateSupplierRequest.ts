import { SupplierContactProps } from '../../domain/valueObjects/SupplierContact';

export interface CreateSupplierRequest {
  rubro: string;
  proveedor: string;
  contacto: SupplierContactProps;
  ultimaEvaluacion?: Date;
  siguienteEvaluacion?: Date;
  evaluacion?: number;
  companyId: string;
}
