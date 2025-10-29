import type { AlertRepository } from '../../domain/contracts/AlertRepository';
import { AlertResponse } from '../dtos/AlertResponse';

export class MarkAlertAsReadUseCase {
  constructor(
    private readonly alertRepository: AlertRepository,
  ) {}

  async execute(id: string): Promise<AlertResponse> {
    const alert = await this.alertRepository.findById(id);
    
    if (!alert) {
      throw new Error(`Alerta con ID ${id} no encontrada`);
    }

    try {
      alert.markAsRead();
      await this.alertRepository.update(alert);
      return this.mapToResponse(alert);
    } catch (error) {
      throw new Error(`Error al marcar alerta como leída: ${(error as Error).message}`);
    }
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
