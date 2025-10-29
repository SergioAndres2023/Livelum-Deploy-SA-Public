import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../domain/enums/RiskEnums';

export interface RiskResponse {
  id: string;
  title: string;
  code: string;
  category: RiskCategory;
  probability: RiskProbability;
  impact: RiskImpact;
  riskLevel: RiskLevel;
  status: RiskStatus;
  owner: string;
  dueDate: Date;
  description: string;
  mitigation: string;
  isOverdue: boolean;
  isCritical: boolean;
  isHighRisk: boolean;
  createdAt: Date;
  updatedAt: Date;
}
