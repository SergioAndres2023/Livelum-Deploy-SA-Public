import type { RiskRepository } from '../../domain/contracts/RiskRepository';
import { RiskStatsResponse } from '../dtos/RiskStatsResponse';
import { RiskProbability, RiskImpact } from '../../domain/enums/RiskEnums';

export class GetRiskStatsUseCase {
  constructor(
    private readonly riskRepository: RiskRepository,
  ) {}

  async execute(): Promise<RiskStatsResponse> {
    const stats = await this.riskRepository.getStats();
    
    // Calcular estadísticas adicionales
    const recent = await this.riskRepository.findByCriteria({
      createdAtFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 días
      createdAtTo: new Date(),
    });

    const dueSoon = await this.riskRepository.findByCriteria({
      dueDateFrom: new Date(),
      dueDateTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Próximos 7 días
    });

    return {
      total: stats.total,
      byStatus: stats.byStatus,
      byLevel: stats.byLevel,
      byCategory: stats.byCategory,
      byProbability: await this.getProbabilityStats(),
      byImpact: await this.getImpactStats(),
      overdue: stats.overdue,
      critical: stats.critical,
      highRisk: stats.highRisk,
      recent: recent.length,
      dueSoon: dueSoon.length,
    };
  }

  private async getProbabilityStats(): Promise<Record<RiskProbability, number>> {
    const [baja, media, alta] = await Promise.all([
      this.riskRepository.countByProbability(RiskProbability.BAJA),
      this.riskRepository.countByProbability(RiskProbability.MEDIA),
      this.riskRepository.countByProbability(RiskProbability.ALTA),
    ]);

    return {
      [RiskProbability.BAJA]: baja,
      [RiskProbability.MEDIA]: media,
      [RiskProbability.ALTA]: alta,
    };
  }

  private async getImpactStats(): Promise<Record<RiskImpact, number>> {
    const [bajo, medio, alto] = await Promise.all([
      this.riskRepository.countByImpact(RiskImpact.BAJO),
      this.riskRepository.countByImpact(RiskImpact.MEDIO),
      this.riskRepository.countByImpact(RiskImpact.ALTO),
    ]);

    return {
      [RiskImpact.BAJO]: bajo,
      [RiskImpact.MEDIO]: medio,
      [RiskImpact.ALTO]: alto,
    };
  }
}
