import { CompanyStatus } from '../../../domain/enums/CompanyEnums';

/**
 * Tipo TypeScript para el schema de Company en MongoDB
 */
export type CompanySchemaType = {
  _id: string;
  razonSocial: string;
  nombreFantasia: string;
  cuit: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  website?: string;
  logo?: string;
  status: CompanyStatus;
  createdAt: Date;
  updatedAt: Date;
};

