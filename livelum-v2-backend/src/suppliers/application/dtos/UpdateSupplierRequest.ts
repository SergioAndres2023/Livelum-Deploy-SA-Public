import { SupplierContactProps } from '../../domain/valueObjects/SupplierContact';

export interface UpdateSupplierRequest {
  rubro?: string;
  proveedor?: string;
  contacto?: SupplierContactProps;
  ultimaEvaluacion?: Date;
  siguienteEvaluacion?: Date;
}
