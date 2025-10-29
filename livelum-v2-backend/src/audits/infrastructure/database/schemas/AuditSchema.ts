import mongoose, { Schema } from 'mongoose';
import { AuditType, AuditStatus } from '../../../domain/enums/AuditEnums';
import { AuditSchemaType } from './AuditSchemaType';

const auditSchema = new Schema<AuditSchemaType>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  auditType: {
    type: String,
    enum: Object.values(AuditType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(AuditStatus),
    required: true,
    default: AuditStatus.PLANNED,
  },
  plannedDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(this: AuditSchemaType, value: Date) {
        return value > new Date();
      },
      message: 'La fecha planificada debe ser en el futuro',
    },
  },
  actualDate: {
    type: Date,
    validate: {
      validator: function(this: AuditSchemaType, value: Date) {
        return !value || value >= this.plannedDate;
      },
      message: 'La fecha real no puede ser anterior a la fecha planificada',
    },
  },
  auditorName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  scope: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  findings: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  recommendations: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
}, {
  timestamps: true,
  collection: 'audits',
});

// Índices para optimizar búsquedas
auditSchema.index({ title: 1 });
auditSchema.index({ auditType: 1 });
auditSchema.index({ status: 1 });
auditSchema.index({ auditorName: 1 });
auditSchema.index({ plannedDate: 1 });
auditSchema.index({ actualDate: 1 });
auditSchema.index({ createdAt: -1 });

// Índices compuestos para búsquedas frecuentes
auditSchema.index({ status: 1, plannedDate: 1 });
auditSchema.index({ auditType: 1, status: 1 });
auditSchema.index({ auditorName: 1, status: 1 });

// Índice de texto para búsquedas full-text
auditSchema.index({ 
  title: 'text', 
  scope: 'text',
  auditorName: 'text' 
});

export const AuditModel = mongoose.model<AuditSchemaType>('Audit', auditSchema);
