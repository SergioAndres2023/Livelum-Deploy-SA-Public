import { IndicatorCategory, IndicatorType, IndicatorFrequency } from '../../domain/enums/IndicatorEnums';

export interface CreateIndicatorRequest {
  name: string;
  code: string;
  category: IndicatorCategory;
  type: IndicatorType;
  currentValue: number;
  targetValue: number;
  unit: string;
  owner: string;
  frequency: IndicatorFrequency;
  description?: string;
  lastUpdate?: Date;
}
