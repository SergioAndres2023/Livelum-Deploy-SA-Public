import { RiskCategory, RiskProbability, RiskImpact, RiskStatus } from '../../domain/enums/RiskEnums';

export interface UpdateRiskRequest {
  title?: string;
  category?: RiskCategory;
  probability?: RiskProbability;
  impact?: RiskImpact;
  owner?: string;
  dueDate?: Date;
  description?: string;
  mitigation?: string;
  status?: RiskStatus;
}
