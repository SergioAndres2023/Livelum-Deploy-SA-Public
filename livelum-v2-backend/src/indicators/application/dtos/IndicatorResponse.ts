import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../domain/enums/IndicatorEnums';

export interface IndicatorResponse {
  id: string;
  name: string;
  code: string;
  category: IndicatorCategory;
  type: IndicatorType;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: IndicatorTrend;
  status: IndicatorStatus;
  owner: string;
  lastUpdate: Date;
  frequency: IndicatorFrequency;
  description?: string;
  isAboveTarget: boolean;
  isBelowTarget: boolean;
  isOnTarget: boolean;
  progressPercentage: number;
  isCritical: boolean;
  isWarning: boolean;
  isGood: boolean;
  createdAt: Date;
  updatedAt: Date;
}
