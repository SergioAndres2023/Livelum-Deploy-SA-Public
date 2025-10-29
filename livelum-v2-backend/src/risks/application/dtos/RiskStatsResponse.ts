import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../domain/enums/RiskEnums';

export interface RiskStatsResponse {
  total: number;
  byStatus: Record<RiskStatus, number>;
  byLevel: Record<RiskLevel, number>;
  byCategory: Record<RiskCategory, number>;
  byProbability: Record<RiskProbability, number>;
  byImpact: Record<RiskImpact, number>;
  overdue: number;
  critical: number;
  highRisk: number;
  recent: number; // Últimos 30 días
  dueSoon: number; // Próximos 7 días
}
