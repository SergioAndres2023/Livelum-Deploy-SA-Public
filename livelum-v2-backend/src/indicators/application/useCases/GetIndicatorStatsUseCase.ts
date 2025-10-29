import type { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';
import { IndicatorStatsResponse } from '../dtos/IndicatorStatsResponse';

export class GetIndicatorStatsUseCase {
  constructor(
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  async execute(): Promise<IndicatorStatsResponse> {
    const stats = await this.indicatorRepository.getStats();
    
    // Calcular indicadores adicionales
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCriteria = {
      lastUpdateFrom: thirtyDaysAgo,
      lastUpdateTo: new Date(),
    };
    
    const needsUpdateCriteria = {
      lastUpdateFrom: new Date(0),
      lastUpdateTo: sevenDaysAgo,
    };
    
    const recentIndicators = await this.indicatorRepository.findByCriteria(recentCriteria);
    const needsUpdateIndicators = await this.indicatorRepository.findByCriteria(needsUpdateCriteria);
    
    return {
      total: stats.total,
      byStatus: stats.byStatus,
      byType: stats.byType,
      byCategory: stats.byCategory,
      byTrend: stats.byTrend,
      byFrequency: stats.byFrequency,
      critical: stats.critical,
      warning: stats.warning,
      good: stats.good,
      aboveTarget: stats.aboveTarget,
      belowTarget: stats.belowTarget,
      onTarget: stats.onTarget,
      recent: recentIndicators.length,
      needsUpdate: needsUpdateIndicators.length,
    };
  }
}
