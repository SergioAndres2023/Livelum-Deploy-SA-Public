import { Schema } from 'mongoose';
import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../../../domain/enums/IndicatorEnums';

export const IndicatorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: 50,
  },
  category: {
    type: String,
    required: true,
    enum: Object.values(IndicatorCategory),
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(IndicatorType),
  },
  currentValue: {
    type: Number,
    required: true,
    min: 0,
  },
  targetValue: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  trend: {
    type: String,
    required: true,
    enum: Object.values(IndicatorTrend),
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(IndicatorStatus),
  },
  owner: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  frequency: {
    type: String,
    required: true,
    enum: Object.values(IndicatorFrequency),
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
}, {
  timestamps: true,
  collection: 'indicators',
});

// Índices
IndicatorSchema.index({ code: 1 }, { unique: true });
IndicatorSchema.index({ name: 1 });
IndicatorSchema.index({ category: 1 });
IndicatorSchema.index({ type: 1 });
IndicatorSchema.index({ status: 1 });
IndicatorSchema.index({ trend: 1 });
IndicatorSchema.index({ owner: 1 });
IndicatorSchema.index({ frequency: 1 });
IndicatorSchema.index({ lastUpdate: 1 });
IndicatorSchema.index({ createdAt: 1 });
IndicatorSchema.index({ updatedAt: 1 });

// Índices compuestos
IndicatorSchema.index({ category: 1, status: 1 });
IndicatorSchema.index({ type: 1, status: 1 });
IndicatorSchema.index({ status: 1, lastUpdate: 1 });
IndicatorSchema.index({ owner: 1, status: 1 });
