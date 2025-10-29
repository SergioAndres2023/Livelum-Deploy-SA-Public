import { StakeholderType } from '../../../domain/enums/StakeholderEnums';

export interface StakeholderSchemaType {
  _id: string;
  numero: number;
  nombre: string;
  tipo: StakeholderType;
  requisitos: string;
  metodoEvaluacion: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

