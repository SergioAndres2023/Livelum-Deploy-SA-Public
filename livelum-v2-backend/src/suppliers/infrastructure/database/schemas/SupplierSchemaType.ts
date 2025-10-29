import { SupplierStatus } from '../../../domain/enums/SupplierEnums';
import { SupplierContactProps } from '../../../domain/valueObjects/SupplierContact';

export interface SupplierSchemaType {
  _id: string;
  rubro: string;
  proveedor: string;
  contacto: SupplierContactProps;
  ultimaEvaluacion?: Date;
  siguienteEvaluacion?: Date;
  estado: SupplierStatus;
  evaluacion: number;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

