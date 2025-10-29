import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../domain/enums/AlertEnums';

export interface SearchAlertsRequest {
  title?: string;
  message?: string;
  type?: AlertType;
  status?: AlertStatus;
  priority?: AlertPriority;
  category?: AlertCategory;
  channel?: AlertChannel;
  recipient?: string;
  sender?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  isPending?: boolean;
  isSent?: boolean;
  isRead?: boolean;
  isAcknowledged?: boolean;
  isDismissed?: boolean;
  isActive?: boolean;
  isOverdue?: boolean;
  isHighPriority?: boolean;
  isCritical?: boolean;
  scheduledFrom?: Date;
  scheduledTo?: Date;
  sentFrom?: Date;
  sentTo?: Date;
  createdFrom?: Date;
  createdTo?: Date;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'type' | 'priority' | 'status' | 'createdAt' | 'scheduledFor' | 'sentAt';
  sortOrder?: 'asc' | 'desc';
}
