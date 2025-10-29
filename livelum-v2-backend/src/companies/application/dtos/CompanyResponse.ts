import { CompanyStatus } from '../../domain/enums/CompanyEnums';

/**
 * DTO de respuesta para empresas
 */
export interface CompanyResponse {
  id: string;
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
  isActive: boolean;
  isInactive: boolean;
  isSuspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

