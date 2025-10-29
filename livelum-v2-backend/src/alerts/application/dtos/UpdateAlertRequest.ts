import { AlertType, AlertPriority, AlertCategory, AlertChannel } from '../../domain/enums/AlertEnums';

export interface UpdateAlertRequest {
  title?: string;
  message?: string;
  type?: AlertType;
  priority?: AlertPriority;
  category?: AlertCategory;
  channel?: AlertChannel;
  recipient?: string;
  sender?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  scheduledFor?: Date;
  metadata?: Record<string, any>;
}
