import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../domain/enums/IndicatorEnums';

export interface SearchIndicatorsRequest {
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
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'code' | 'currentValue' | 'targetValue' | 'lastUpdate' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
