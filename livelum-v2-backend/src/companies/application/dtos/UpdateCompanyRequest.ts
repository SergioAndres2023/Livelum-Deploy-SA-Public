/**
 * DTO para la actualización de empresas
 */
export interface UpdateCompanyRequest {
  razonSocial?: string;
  nombreFantasia?: string;
  cuit?: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  website?: string;
  logo?: string;
}

