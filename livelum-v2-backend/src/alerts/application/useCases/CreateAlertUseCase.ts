import { Alert } from '../../domain/entities/Alert';
import type { AlertRepository } from '../../domain/contracts/AlertRepository';
import { CreateAlertRequest } from '../dtos/CreateAlertRequest';
import { AlertResponse } from '../dtos/AlertResponse';

export class CreateAlertUseCase {
  constructor(
    private readonly alertRepository: AlertRepository,
  ) {}

  async execute(request: CreateAlertRequest): Promise<AlertResponse> {
    try {
      const alert = Alert.create(request);
      await this.alertRepository.save(alert);
      return this.mapToResponse(alert);
    } catch (error) {
      throw new Error(`Error al crear alerta: ${(error as Error).message}`);
    }
  }

  private mapToResponse(alert: Alert): AlertResponse {
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
