import { RiskCategory, RiskProbability, RiskImpact } from '../../domain/enums/RiskEnums';

export interface CreateRiskRequest {
  title: string;
  code: string;
  category: RiskCategory;
  probability: RiskProbability;
  impact: RiskImpact;
  owner: string;
  dueDate: Date;
  description: string;
  mitigation: string;
}
