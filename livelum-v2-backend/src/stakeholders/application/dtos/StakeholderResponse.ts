import { StakeholderType } from '../../domain/enums/StakeholderEnums';

export interface StakeholderResponse {
  id: string;
  numero: number;
  nombre: string;
  tipo: StakeholderType;
  requisitos: string;
  metodoEvaluacion: string;
  companyId: string;
  isInternal: boolean;
  isExternal: boolean;
  createdAt: Date;
  updatedAt: Date;
}
