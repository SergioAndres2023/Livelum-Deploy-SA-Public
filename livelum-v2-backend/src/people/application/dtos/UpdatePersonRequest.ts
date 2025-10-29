import { ContractType } from '../../domain/enums/PersonEnums';

/**
 * DTO para la actualización de personas
 */
export interface UpdatePersonRequest {
  username?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  documento?: string;
  telefono?: string;
  positions?: string[];
  contractType?: ContractType;
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

