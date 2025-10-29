import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../domain/enums/AlertEnums';

export interface AlertStatsResponse {
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
