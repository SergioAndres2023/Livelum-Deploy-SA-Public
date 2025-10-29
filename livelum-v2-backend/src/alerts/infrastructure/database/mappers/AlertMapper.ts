import { Alert } from '../../../domain/entities/Alert';
import { AlertDocument } from '../schemas/AlertSchemaType';

export class AlertMapper {
  static toDomain(document: AlertDocument): Alert {
    const props = {
      title: document.title,
      message: document.message,
      type: document.type,
      status: document.status,
      priority: document.priority,
      category: document.category,
      channel: document.channel,
      recipient: document.recipient,
      sender: document.sender,
      relatedEntityType: document.relatedEntityType,
      relatedEntityId: document.relatedEntityId,
      scheduledFor: document.scheduledFor,
      sentAt: document.sentAt,
      readAt: document.readAt,
      acknowledgedAt: document.acknowledgedAt,
      dismissedAt: document.dismissedAt,
      metadata: document.metadata,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    return Alert.restore(props, document._id.toString());
  }

  static toPersistence(alert: Alert): Partial<AlertDocument> {
    const primitives = alert.toPrimitives();
    
    return {
      _id: primitives.id,
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
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
