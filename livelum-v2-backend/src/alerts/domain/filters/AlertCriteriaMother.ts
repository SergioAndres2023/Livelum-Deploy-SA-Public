import { AlertSearchCriteria } from '../contracts/AlertRepository';
import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../enums/AlertEnums';

export class AlertSearchCriteriaBuilder {
  private criteria: AlertSearchCriteria = {};

  static create(): AlertSearchCriteriaBuilder {
    return new AlertSearchCriteriaBuilder();
  }

  withTitle(title: string): AlertSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  withMessage(message: string): AlertSearchCriteriaBuilder {
    this.criteria.message = message;
    return this;
  }

  withType(type: AlertType): AlertSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: AlertStatus): AlertSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withPriority(priority: AlertPriority): AlertSearchCriteriaBuilder {
    this.criteria.priority = priority;
    return this;
  }

  withCategory(category: AlertCategory): AlertSearchCriteriaBuilder {
    this.criteria.category = category;
    return this;
  }

  withChannel(channel: AlertChannel): AlertSearchCriteriaBuilder {
    this.criteria.channel = channel;
    return this;
  }

  withRecipient(recipient: string): AlertSearchCriteriaBuilder {
    this.criteria.recipient = recipient;
    return this;
  }

  withSender(sender: string): AlertSearchCriteriaBuilder {
    this.criteria.sender = sender;
    return this;
  }

  withRelatedEntity(entityType: string, entityId: string): AlertSearchCriteriaBuilder {
    this.criteria.relatedEntityType = entityType;
    this.criteria.relatedEntityId = entityId;
    return this;
  }

  withPending(): AlertSearchCriteriaBuilder {
    this.criteria.isPending = true;
    return this;
  }

  withSent(): AlertSearchCriteriaBuilder {
    this.criteria.isSent = true;
    return this;
  }

  withRead(): AlertSearchCriteriaBuilder {
    this.criteria.isRead = true;
    return this;
  }

  withAcknowledged(): AlertSearchCriteriaBuilder {
    this.criteria.isAcknowledged = true;
    return this;
  }

  withDismissed(): AlertSearchCriteriaBuilder {
    this.criteria.isDismissed = true;
    return this;
  }

  withActive(): AlertSearchCriteriaBuilder {
    this.criteria.isActive = true;
    return this;
  }

  withOverdue(): AlertSearchCriteriaBuilder {
    this.criteria.isOverdue = true;
    return this;
  }

  withHighPriority(): AlertSearchCriteriaBuilder {
    this.criteria.isHighPriority = true;
    return this;
  }

  withCritical(): AlertSearchCriteriaBuilder {
    this.criteria.isCritical = true;
    return this;
  }

  withScheduledRange(from: Date, to: Date): AlertSearchCriteriaBuilder {
    this.criteria.scheduledFrom = from;
    this.criteria.scheduledTo = to;
    return this;
  }

  withSentRange(from: Date, to: Date): AlertSearchCriteriaBuilder {
    this.criteria.sentFrom = from;
    this.criteria.sentTo = to;
    return this;
  }

  withCreatedRange(from: Date, to: Date): AlertSearchCriteriaBuilder {
    this.criteria.createdFrom = from;
    this.criteria.createdTo = to;
    return this;
  }

  withPagination(page: number, limit: number): AlertSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(sortBy: AlertSearchCriteria['sortBy'], sortOrder: 'asc' | 'desc' = 'asc'): AlertSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): AlertSearchCriteria {
    return { ...this.criteria };
  }
}

export class AlertSearchCriteriaMother {
  static byTitle(title: string): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withTitle(title)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static byType(type: AlertType): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withType(type)
      .withSorting('priority', 'desc')
      .build();
  }

  static byStatus(status: AlertStatus): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withStatus(status)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static byPriority(priority: AlertPriority): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withPriority(priority)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static byCategory(category: AlertCategory): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withCategory(category)
      .withSorting('priority', 'desc')
      .build();
  }

  static byRecipient(recipient: string): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withRecipient(recipient)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static pending(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withPending()
      .withSorting('scheduledFor', 'asc')
      .build();
  }

  static sent(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withSent()
      .withSorting('sentAt', 'desc')
      .build();
  }

  static read(): AlertSearchCriteriaBuilder {
    return AlertSearchCriteriaBuilder
      .create()
      .withRead()
      .withSorting('createdAt', 'desc');
  }

  static acknowledged(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withAcknowledged()
      .withSorting('createdAt', 'desc')
      .build();
  }

  static dismissed(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withDismissed()
      .withSorting('createdAt', 'desc')
      .build();
  }

  static active(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withActive()
      .withSorting('priority', 'desc')
      .build();
  }

  static overdue(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withOverdue()
      .withSorting('scheduledFor', 'asc')
      .build();
  }

  static highPriority(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withHighPriority()
      .withSorting('createdAt', 'desc')
      .build();
  }

  static critical(): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withCritical()
      .withSorting('createdAt', 'desc')
      .build();
  }

  static recent(hours: number = 24): AlertSearchCriteria {
    const fromDate = new Date();
    fromDate.setHours(fromDate.getHours() - hours);
    
    return AlertSearchCriteriaBuilder
      .create()
      .withCreatedRange(fromDate, new Date())
      .withSorting('createdAt', 'desc')
      .build();
  }

  static today(): AlertSearchCriteria {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return AlertSearchCriteriaBuilder
      .create()
      .withCreatedRange(today, tomorrow)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static scheduledForSending(): AlertSearchCriteria {
    const now = new Date();
    
    return AlertSearchCriteriaBuilder
      .create()
      .withPending()
      .withScheduledRange(new Date(0), now)
      .withSorting('scheduledFor', 'asc')
      .build();
  }

  static withPagination(page: number, limit: number): AlertSearchCriteria {
    return AlertSearchCriteriaBuilder
      .create()
      .withPagination(page, limit)
      .withSorting('createdAt', 'desc')
      .build();
  }
}
