import { ContractType } from '../../domain/enums/PersonEnums';

/**
 * DTO para la creación de personas
 */
export interface CreatePersonRequest {
  username: string;
  nombre: string;
  apellido: string;
  email?: string;
  documento: string;
  telefono?: string;
  companyId: string;
  positions?: string[];
  contractType?: ContractType;
  hireDate?: Date;
  avatar?: string;
  department?: string;
  supervisor?: string;
  salary?: number;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: string;
  birthDate?: Date;
  notes?: string;
}

