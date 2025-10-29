import { PersonStatus, ContractType } from '../../domain/enums/PersonEnums';

/**
 * DTO de respuesta para personas
 */
export interface PersonResponse {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  fullName: string;
  email?: string;
  documento: string;
  telefono?: string;
  companyId: string;
  status: PersonStatus;
  positions: string[];
  contractType?: ContractType;
  hireDate?: Date;
  terminationDate?: Date;
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
  isActive: boolean;
  isInactive: boolean;
  isOnLeave: boolean;
  isSuspended: boolean;
  isTerminated: boolean;
  yearsOfService: number;
  age: number | null;
  createdAt: Date;
  updatedAt: Date;
}

