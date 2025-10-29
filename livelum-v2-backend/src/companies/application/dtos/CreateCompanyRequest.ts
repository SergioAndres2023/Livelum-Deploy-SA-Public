/**
 * DTO para la creación de empresas
 */
export interface CreateCompanyRequest {
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
}

