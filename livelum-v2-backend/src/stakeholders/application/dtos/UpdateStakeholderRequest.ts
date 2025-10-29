import { StakeholderType } from '../../domain/enums/StakeholderEnums';

export interface UpdateStakeholderRequest {
  nombre?: string;
  tipo?: StakeholderType;
  requisitos?: string;
  metodoEvaluacion?: string;
}
