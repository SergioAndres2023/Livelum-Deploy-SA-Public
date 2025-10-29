import { IndicatorCategory, IndicatorType, IndicatorFrequency } from '../../domain/enums/IndicatorEnums';

export interface UpdateIndicatorRequest {
  name?: string;
  category?: IndicatorCategory;
  type?: IndicatorType;
  targetValue?: number;
  unit?: string;
  owner?: string;
  frequency?: IndicatorFrequency;
  description?: string;
}
