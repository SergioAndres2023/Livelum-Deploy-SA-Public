import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../domain/enums/IndicatorEnums';

export interface IndicatorStatsResponse {
  total: number;
  byStatus: Record<IndicatorStatus, number>;
  byType: Record<IndicatorType, number>;
  byCategory: Record<IndicatorCategory, number>;
  byTrend: Record<IndicatorTrend, number>;
  byFrequency: Record<IndicatorFrequency, number>;
  critical: number;
  warning: number;
  good: number;
  aboveTarget: number;
  belowTarget: number;
  onTarget: number;
  recent: number; // Últimos 30 días
  needsUpdate: number; // No actualizados en 7 días
}
