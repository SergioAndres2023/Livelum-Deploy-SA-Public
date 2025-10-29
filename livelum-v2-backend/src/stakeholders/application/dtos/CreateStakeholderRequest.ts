import { StakeholderType } from '../../domain/enums/StakeholderEnums';

export interface CreateStakeholderRequest {
  nombre: string;
  tipo: StakeholderType;
  requisitos: string;
  metodoEvaluacion: string;
  companyId: string;
}
