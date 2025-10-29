import { PersonStatus, ContractType } from '../../../domain/enums/PersonEnums';

export interface PersonSchemaType {
  _id: string;
  username: string;
  nombre: string;
  apellido: string;
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
  createdAt: Date;
  updatedAt: Date;
}

