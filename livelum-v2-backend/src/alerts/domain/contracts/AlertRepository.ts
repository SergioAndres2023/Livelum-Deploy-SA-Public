import { Alert } from '../entities/Alert';
import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../enums/AlertEnums';

export interface AlertSearchCriteria {
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
  limit?: number;
  offset?: number;
  sortBy?: 'title' | 'type' | 'priority' | 'status' | 'createdAt' | 'scheduledFor' | 'sentAt';
  sortOrder?: 'asc' | 'desc';
}

export interface AlertStats {
  total: number;
  byStatus: Record<AlertStatus, number>;
  byType: Record<AlertType, number>;
  byPriority: Record<AlertPriority, number>;
  byCategory: Record<AlertCategory, number>;
  byChannel: Record<AlertChannel, number>;
  pending: number;
  sent: number;
  read: number;
  acknowledged: number;
  dismissed: number;
  overdue: number;
  highPriority: number;
  critical: number;
  recent: number; // Últimas 24 horas
  today: number; // Hoy
}

export interface AlertRepository {
  save(alert: Alert): Promise<void>;
  findById(id: string): Promise<Alert | null>;
  findByCriteria(criteria: AlertSearchCriteria): Promise<Alert[]>;
  findAll(): Promise<Alert[]>;
  update(alert: Alert): Promise<void>;
  delete(id: string): Promise<void>;
  countByStatus(status: AlertStatus): Promise<number>;
  countByType(type: AlertType): Promise<number>;
  countByPriority(priority: AlertPriority): Promise<number>;
  countByCategory(category: AlertCategory): Promise<number>;
  countByChannel(channel: AlertChannel): Promise<number>;
  countPending(): Promise<number>;
  countSent(): Promise<number>;
  countRead(): Promise<number>;
  countAcknowledged(): Promise<number>;
  countDismissed(): Promise<number>;
  countOverdue(): Promise<number>;
  countHighPriority(): Promise<number>;
  countCritical(): Promise<number>;
  getStats(): Promise<AlertStats>;
  findPending(): Promise<Alert[]>;
  findSent(): Promise<Alert[]>;
  findRead(): Promise<Alert[]>;
  findAcknowledged(): Promise<Alert[]>;
  findDismissed(): Promise<Alert[]>;
  findOverdue(): Promise<Alert[]>;
  findHighPriority(): Promise<Alert[]>;
  findCritical(): Promise<Alert[]>;
  findScheduledForSending(): Promise<Alert[]>;
  findByRecipient(recipient: string): Promise<Alert[]>;
  findByRelatedEntity(entityType: string, entityId: string): Promise<Alert[]>;
}
