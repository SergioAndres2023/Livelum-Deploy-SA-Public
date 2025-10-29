import type { AlertRepository } from '../../domain/contracts/AlertRepository';
import { SearchAlertsRequest } from '../dtos/SearchAlertsRequest';
import { AlertResponse } from '../dtos/AlertResponse';

export class SearchAlertsUseCase {
  constructor(
    private readonly alertRepository: AlertRepository,
  ) {}

  async execute(request: SearchAlertsRequest): Promise<AlertResponse[]> {
    const criteria = this.mapToCriteria(request);
    const alerts = await this.alertRepository.findByCriteria(criteria);
    
    return alerts.map(alert => this.mapToResponse(alert));
  }

  private mapToCriteria(request: SearchAlertsRequest): any {
    const criteria: any = {};

    if (request.title) criteria.title = request.title;
    if (request.message) criteria.message = request.message;
    if (request.type) criteria.type = request.type;
    if (request.status) criteria.status = request.status;
    if (request.priority) criteria.priority = request.priority;
    if (request.category) criteria.category = request.category;
    if (request.channel) criteria.channel = request.channel;
    if (request.recipient) criteria.recipient = request.recipient;
    if (request.sender) criteria.sender = request.sender;
    if (request.relatedEntityType) criteria.relatedEntityType = request.relatedEntityType;
    if (request.relatedEntityId) criteria.relatedEntityId = request.relatedEntityId;
    if (request.isPending !== undefined) criteria.isPending = request.isPending;
    if (request.isSent !== undefined) criteria.isSent = request.isSent;
    if (request.isRead !== undefined) criteria.isRead = request.isRead;
    if (request.isAcknowledged !== undefined) criteria.isAcknowledged = request.isAcknowledged;
    if (request.isDismissed !== undefined) criteria.isDismissed = request.isDismissed;
    if (request.isActive !== undefined) criteria.isActive = request.isActive;
    if (request.isOverdue !== undefined) criteria.isOverdue = request.isOverdue;
    if (request.isHighPriority !== undefined) criteria.isHighPriority = request.isHighPriority;
    if (request.isCritical !== undefined) criteria.isCritical = request.isCritical;
    if (request.scheduledFrom) criteria.scheduledFrom = request.scheduledFrom;
    if (request.scheduledTo) criteria.scheduledTo = request.scheduledTo;
    if (request.sentFrom) criteria.sentFrom = request.sentFrom;
    if (request.sentTo) criteria.sentTo = request.sentTo;
    if (request.createdFrom) criteria.createdFrom = request.createdFrom;
    if (request.createdTo) criteria.createdTo = request.createdTo;
    if (request.sortBy) criteria.sortBy = request.sortBy;
    if (request.sortOrder) criteria.sortOrder = request.sortOrder;

    // Paginación
    if (request.page && request.limit) {
      criteria.limit = request.limit;
      criteria.offset = (request.page - 1) * request.limit;
    }

    return criteria;
  }

  private mapToResponse(alert: any): AlertResponse {
    const primitives = alert.toPrimitives();
    return {
      id: primitives.id,
      title: primitives.title,
      message: primitives.message,
      type: primitives.type,
      status: primitives.status,
      priority: primitives.priority,
      category: primitives.category,
      channel: primitives.channel,
      recipient: primitives.recipient,
      sender: primitives.sender,
      relatedEntityType: primitives.relatedEntityType,
      relatedEntityId: primitives.relatedEntityId,
      scheduledFor: primitives.scheduledFor,
      sentAt: primitives.sentAt,
      readAt: primitives.readAt,
      acknowledgedAt: primitives.acknowledgedAt,
      dismissedAt: primitives.dismissedAt,
      metadata: primitives.metadata,
      isPending: alert.isPending(),
      isSent: alert.isSent(),
      isRead: alert.isRead(),
      isAcknowledged: alert.isAcknowledged(),
      isDismissed: alert.isDismissed(),
      isActive: alert.isActive(),
      isOverdue: alert.isOverdue(),
      isHighPriority: alert.isHighPriority(),
      isCritical: alert.isCritical(),
      ageInMinutes: alert.getAgeInMinutes(),
      timeToSend: alert.getTimeToSend(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
