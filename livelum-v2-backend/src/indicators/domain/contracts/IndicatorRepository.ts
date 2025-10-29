import { Indicator } from '../entities/Indicator';
import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../enums/IndicatorEnums';

export interface IndicatorSearchCriteria {
  name?: string;
  code?: string;
  category?: IndicatorCategory;
  type?: IndicatorType;
  trend?: IndicatorTrend;
  status?: IndicatorStatus;
  owner?: string;
  frequency?: IndicatorFrequency;
  isCritical?: boolean;
  isWarning?: boolean;
  isGood?: boolean;
  isAboveTarget?: boolean;
  isBelowTarget?: boolean;
  lastUpdateFrom?: Date;
  lastUpdateTo?: Date;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'code' | 'currentValue' | 'targetValue' | 'lastUpdate' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface IndicatorStats {
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
}

export interface IndicatorRepository {
  save(indicator: Indicator): Promise<void>;
  findById(id: string): Promise<Indicator | null>;
  findByCode(code: string): Promise<Indicator | null>;
  findByCriteria(criteria: IndicatorSearchCriteria): Promise<Indicator[]>;
  findAll(): Promise<Indicator[]>;
  update(indicator: Indicator): Promise<void>;
  delete(id: string): Promise<void>;
  countByStatus(status: IndicatorStatus): Promise<number>;
  countByType(type: IndicatorType): Promise<number>;
  countByCategory(category: IndicatorCategory): Promise<number>;
  countByTrend(trend: IndicatorTrend): Promise<number>;
  countByFrequency(frequency: IndicatorFrequency): Promise<number>;
  countCritical(): Promise<number>;
  countWarning(): Promise<number>;
  countGood(): Promise<number>;
  countAboveTarget(): Promise<number>;
  countBelowTarget(): Promise<number>;
  countOnTarget(): Promise<number>;
  getStats(): Promise<IndicatorStats>;
  findCritical(): Promise<Indicator[]>;
  findWarning(): Promise<Indicator[]>;
  findGood(): Promise<Indicator[]>;
  findAboveTarget(): Promise<Indicator[]>;
  findBelowTarget(): Promise<Indicator[]>;
  findOnTarget(): Promise<Indicator[]>;
}
