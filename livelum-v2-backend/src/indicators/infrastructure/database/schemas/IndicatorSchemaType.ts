import { Document } from 'mongoose';
import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../../domain/enums/IndicatorEnums';

export interface IndicatorDocument extends Document {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
