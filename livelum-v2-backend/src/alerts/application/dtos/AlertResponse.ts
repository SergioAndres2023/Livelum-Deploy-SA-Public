import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../domain/enums/AlertEnums';

export interface AlertResponse {
  id: string;
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
  isPending: boolean;
  isSent: boolean;
  isRead: boolean;
  isAcknowledged: boolean;
  isDismissed: boolean;
  isActive: boolean;
  isOverdue: boolean;
  isHighPriority: boolean;
  isCritical: boolean;
  ageInMinutes: number;
  timeToSend: number | null;
  createdAt: Date;
  updatedAt: Date;
}
