import { Document } from 'mongoose';
import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../../domain/enums/AlertEnums';

export interface AlertDocument extends Document {
  _id: string;
  title: string;
  message: string;
  type: AlertType;
  status: AlertStatus;
  priority: AlertPriority;
  category: AlertCategory;
  channel: AlertChannel;
  recipient: string;
  sender: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  scheduledFor?: Date;
  sentAt?: Date;
  readAt?: Date;
  acknowledgedAt?: Date;
  dismissedAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
