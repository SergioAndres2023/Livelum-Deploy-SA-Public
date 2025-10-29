import { Schema } from 'mongoose';
import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../../domain/enums/AlertEnums';

export const AlertSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(AlertType),
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(AlertStatus),
    default: AlertStatus.PENDING,
  },
  priority: {
    type: String,
    required: true,
    enum: Object.values(AlertPriority),
  },
  category: {
    type: String,
    required: true,
    enum: Object.values(AlertCategory),
  },
  channel: {
    type: String,
    required: true,
    enum: Object.values(AlertChannel),
  },
  recipient: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  sender: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  relatedEntityType: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  relatedEntityId: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  scheduledFor: {
    type: Date,
  },
  sentAt: {
    type: Date,
  },
  readAt: {
    type: Date,
  },
  acknowledgedAt: {
    type: Date,
  },
  dismissedAt: {
    type: Date,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
  collection: 'alerts',
});

// Índices
AlertSchema.index({ title: 1 });
AlertSchema.index({ type: 1 });
AlertSchema.index({ status: 1 });
AlertSchema.index({ priority: 1 });
AlertSchema.index({ category: 1 });
AlertSchema.index({ channel: 1 });
AlertSchema.index({ recipient: 1 });
AlertSchema.index({ sender: 1 });
AlertSchema.index({ relatedEntityType: 1 });
AlertSchema.index({ relatedEntityId: 1 });
AlertSchema.index({ scheduledFor: 1 });
AlertSchema.index({ sentAt: 1 });
AlertSchema.index({ readAt: 1 });
AlertSchema.index({ acknowledgedAt: 1 });
AlertSchema.index({ dismissedAt: 1 });
AlertSchema.index({ createdAt: 1 });
AlertSchema.index({ updatedAt: 1 });

// Índices compuestos
AlertSchema.index({ status: 1, priority: 1 });
AlertSchema.index({ recipient: 1, status: 1 });
AlertSchema.index({ type: 1, status: 1 });
AlertSchema.index({ category: 1, status: 1 });
AlertSchema.index({ channel: 1, status: 1 });
AlertSchema.index({ relatedEntityType: 1, relatedEntityId: 1 });
AlertSchema.index({ status: 1, scheduledFor: 1 });
AlertSchema.index({ status: 1, createdAt: 1 });
AlertSchema.index({ priority: 1, createdAt: 1 });
