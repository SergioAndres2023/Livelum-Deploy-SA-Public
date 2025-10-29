import { Schema } from 'mongoose';
import { RiskDocument } from './RiskSchemaType';
import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../../domain/enums/RiskEnums';

export const RiskSchema = new Schema<RiskDocument>({
  title: {
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
    maxlength: 20,
  },
  category: {
    type: String,
    enum: Object.values(RiskCategory),
    required: true,
  },
  probability: {
    type: String,
    enum: Object.values(RiskProbability),
    required: true,
  },
  impact: {
    type: String,
    enum: Object.values(RiskImpact),
    required: true,
  },
  riskLevel: {
    type: String,
    enum: Object.values(RiskLevel),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(RiskStatus),
    default: RiskStatus.ACTIVE,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  mitigation: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Índices para optimizar consultas
RiskSchema.index({ code: 1 }, { unique: true });
RiskSchema.index({ title: 1 });
RiskSchema.index({ category: 1 });
RiskSchema.index({ riskLevel: 1 });
RiskSchema.index({ status: 1 });
RiskSchema.index({ owner: 1 });
RiskSchema.index({ dueDate: 1 });
RiskSchema.index({ createdAt: 1 });
RiskSchema.index({ updatedAt: 1 });

// Índices compuestos para consultas complejas
RiskSchema.index({ status: 1, riskLevel: 1 });
RiskSchema.index({ category: 1, status: 1 });
RiskSchema.index({ dueDate: 1, status: 1 });
RiskSchema.index({ owner: 1, status: 1 });

// Virtual para verificar si está vencido
RiskSchema.virtual('isOverdue').get(function() {
  return this.dueDate < new Date() && this.status !== RiskStatus.CLOSED;
});

// Virtual para verificar si es crítico
RiskSchema.virtual('isCritical').get(function() {
  return this.riskLevel === RiskLevel.CRITICO;
});

// Virtual para verificar si es alto riesgo
RiskSchema.virtual('isHighRisk').get(function() {
  return this.riskLevel === RiskLevel.ALTO || this.riskLevel === RiskLevel.CRITICO;
});

// Middleware para actualizar updatedAt
RiskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Middleware para actualizar updatedAt en updates
RiskSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

RiskSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});
