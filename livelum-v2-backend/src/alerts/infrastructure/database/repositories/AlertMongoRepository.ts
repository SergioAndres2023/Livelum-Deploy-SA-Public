import mongoose, { Model } from 'mongoose';
import type { AlertRepository, AlertStats } from '../../../domain/contracts/AlertRepository';
import { Alert } from '../../../domain/entities/Alert';
import { AlertDocument } from '../schemas/AlertSchemaType';
import { AlertSchema } from '../schemas/AlertSchema';
import { AlertMapper } from '../mappers/AlertMapper';
import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../../../domain/enums/AlertEnums';

export class AlertMongoRepository implements AlertRepository {
  private model: Model<AlertDocument>;

  constructor() {
    this.model = mongoose.model<AlertDocument>('Alert', AlertSchema);
  }

  async save(alert: Alert): Promise<void> {
    const persistence = AlertMapper.toPersistence(alert);
    await this.model.create(persistence);
  }

  async findById(id: string): Promise<Alert | null> {
    const document = await this.model.findById(id).exec();
    return document ? AlertMapper.toDomain(document) : null;
  }

  async findByCriteria(criteria: any): Promise<Alert[]> {
    const query: any = {};
    
    if (criteria.title) {
      query.title = { $regex: criteria.title, $options: 'i' };
    }
    if (criteria.message) {
      query.message = { $regex: criteria.message, $options: 'i' };
    }
    if (criteria.type) {
      query.type = criteria.type;
    }
    if (criteria.status) {
      query.status = criteria.status;
    }
    if (criteria.priority) {
      query.priority = criteria.priority;
    }
    if (criteria.category) {
      query.category = criteria.category;
    }
    if (criteria.channel) {
      query.channel = criteria.channel;
    }
    if (criteria.recipient) {
      query.recipient = { $regex: criteria.recipient, $options: 'i' };
    }
    if (criteria.sender) {
      query.sender = { $regex: criteria.sender, $options: 'i' };
    }
    if (criteria.relatedEntityType) {
      query.relatedEntityType = criteria.relatedEntityType;
    }
    if (criteria.relatedEntityId) {
      query.relatedEntityId = criteria.relatedEntityId;
    }
    if (criteria.isPending) {
      query.status = AlertStatus.PENDING;
    }
    if (criteria.isSent) {
      query.status = AlertStatus.SENT;
    }
    if (criteria.isRead) {
      query.status = AlertStatus.READ;
    }
    if (criteria.isAcknowledged) {
      query.status = AlertStatus.ACKNOWLEDGED;
    }
    if (criteria.isDismissed) {
      query.status = AlertStatus.DISMISSED;
    }
    if (criteria.isActive) {
      query.status = { $ne: AlertStatus.DISMISSED };
    }
    if (criteria.isOverdue) {
      query.scheduledFor = { $lt: new Date() };
      query.status = AlertStatus.PENDING;
    }
    if (criteria.isHighPriority) {
      query.priority = { $in: [AlertPriority.HIGH, AlertPriority.URGENT] };
    }
    if (criteria.isCritical) {
      query.$or = [
        { type: AlertType.CRITICAL },
        { priority: AlertPriority.URGENT }
      ];
    }
    if (criteria.scheduledFrom) {
      query.scheduledFor = { $gte: criteria.scheduledFrom };
    }
    if (criteria.scheduledTo) {
      query.scheduledFor = { ...query.scheduledFor, $lte: criteria.scheduledTo };
    }
    if (criteria.sentFrom) {
      query.sentAt = { $gte: criteria.sentFrom };
    }
    if (criteria.sentTo) {
      query.sentAt = { ...query.sentAt, $lte: criteria.sentTo };
    }
    if (criteria.createdFrom) {
      query.createdAt = { $gte: criteria.createdFrom };
    }
    if (criteria.createdTo) {
      query.createdAt = { ...query.createdAt, $lte: criteria.createdTo };
    }

    const options: mongoose.QueryOptions = {};
    if (criteria.limit) {
      options.limit = criteria.limit;
    }
    if (criteria.offset) {
      options.skip = criteria.offset;
    }
    if (criteria.sortBy && criteria.sortOrder) {
      options.sort = { [criteria.sortBy]: criteria.sortOrder === 'asc' ? 1 : -1 };
    } else {
      options.sort = { createdAt: -1 };
    }

    const documents = await this.model.find(query, null, options).exec();
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findAll(): Promise<Alert[]> {
    const documents = await this.model.find().sort({ createdAt: -1 }).exec();
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async update(alert: Alert): Promise<void> {
    const persistence = AlertMapper.toPersistence(alert);
    await this.model.findByIdAndUpdate(alert.id, persistence).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async countByStatus(status: AlertStatus): Promise<number> {
    return this.model.countDocuments({ status }).exec();
  }

  async countByType(type: AlertType): Promise<number> {
    return this.model.countDocuments({ type }).exec();
  }

  async countByPriority(priority: AlertPriority): Promise<number> {
    return this.model.countDocuments({ priority }).exec();
  }

  async countByCategory(category: AlertCategory): Promise<number> {
    return this.model.countDocuments({ category }).exec();
  }

  async countByChannel(channel: AlertChannel): Promise<number> {
    return this.model.countDocuments({ channel }).exec();
  }

  async countPending(): Promise<number> {
    return this.model.countDocuments({ status: AlertStatus.PENDING }).exec();
  }

  async countSent(): Promise<number> {
    return this.model.countDocuments({ status: AlertStatus.SENT }).exec();
  }

  async countRead(): Promise<number> {
    return this.model.countDocuments({ status: AlertStatus.READ }).exec();
  }

  async countAcknowledged(): Promise<number> {
    return this.model.countDocuments({ status: AlertStatus.ACKNOWLEDGED }).exec();
  }

  async countDismissed(): Promise<number> {
    return this.model.countDocuments({ status: AlertStatus.DISMISSED }).exec();
  }

  async countOverdue(): Promise<number> {
    return this.model.countDocuments({
      scheduledFor: { $lt: new Date() },
      status: AlertStatus.PENDING
    }).exec();
  }

  async countHighPriority(): Promise<number> {
    return this.model.countDocuments({
      priority: { $in: [AlertPriority.HIGH, AlertPriority.URGENT] }
    }).exec();
  }

  async countCritical(): Promise<number> {
    return this.model.countDocuments({
      $or: [
        { type: AlertType.CRITICAL },
        { priority: AlertPriority.URGENT }
      ]
    }).exec();
  }

  async getStats(): Promise<AlertStats> {
    const total = await this.model.countDocuments().exec();
    const pending = await this.countPending();
    const sent = await this.countSent();
    const read = await this.countRead();
    const acknowledged = await this.countAcknowledged();
    const dismissed = await this.countDismissed();
    const overdue = await this.countOverdue();
    const highPriority = await this.countHighPriority();
    const critical = await this.countCritical();

    const byStatus: Record<AlertStatus, number> = {} as Record<AlertStatus, number>;
    for (const status of Object.values(AlertStatus)) {
      byStatus[status] = await this.countByStatus(status);
    }

    const byType: Record<AlertType, number> = {} as Record<AlertType, number>;
    for (const type of Object.values(AlertType)) {
      byType[type] = await this.countByType(type);
    }

    const byPriority: Record<AlertPriority, number> = {} as Record<AlertPriority, number>;
    for (const priority of Object.values(AlertPriority)) {
      byPriority[priority] = await this.countByPriority(priority);
    }

    const byCategory: Record<AlertCategory, number> = {} as Record<AlertCategory, number>;
    for (const category of Object.values(AlertCategory)) {
      byCategory[category] = await this.countByCategory(category);
    }

    const byChannel: Record<AlertChannel, number> = {} as Record<AlertChannel, number>;
    for (const channel of Object.values(AlertChannel)) {
      byChannel[channel] = await this.countByChannel(channel);
    }

    return {
      total,
      byStatus,
      byType,
      byPriority,
      byCategory,
      byChannel,
      pending,
      sent,
      read,
      acknowledged,
      dismissed,
      overdue,
      highPriority,
      critical,
      recent: 0, // Se calculará en el UseCase
      today: 0, // Se calculará en el UseCase
    };
  }

  async findPending(): Promise<Alert[]> {
    const documents = await this.model.find({
      status: AlertStatus.PENDING
    }).sort({ scheduledFor: 1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findSent(): Promise<Alert[]> {
    const documents = await this.model.find({
      status: AlertStatus.SENT
    }).sort({ sentAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findRead(): Promise<Alert[]> {
    const documents = await this.model.find({
      status: AlertStatus.READ
    }).sort({ readAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findAcknowledged(): Promise<Alert[]> {
    const documents = await this.model.find({
      status: AlertStatus.ACKNOWLEDGED
    }).sort({ acknowledgedAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findDismissed(): Promise<Alert[]> {
    const documents = await this.model.find({
      status: AlertStatus.DISMISSED
    }).sort({ dismissedAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findOverdue(): Promise<Alert[]> {
    const documents = await this.model.find({
      scheduledFor: { $lt: new Date() },
      status: AlertStatus.PENDING
    }).sort({ scheduledFor: 1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findHighPriority(): Promise<Alert[]> {
    const documents = await this.model.find({
      priority: { $in: [AlertPriority.HIGH, AlertPriority.URGENT] }
    }).sort({ priority: -1, createdAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findCritical(): Promise<Alert[]> {
    const documents = await this.model.find({
      $or: [
        { type: AlertType.CRITICAL },
        { priority: AlertPriority.URGENT }
      ]
    }).sort({ priority: -1, createdAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findScheduledForSending(): Promise<Alert[]> {
    const now = new Date();
    const documents = await this.model.find({
      status: AlertStatus.PENDING,
      $or: [
        { scheduledFor: { $exists: false } },
        { scheduledFor: { $lte: now } }
      ]
    }).sort({ scheduledFor: 1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findByRecipient(recipient: string): Promise<Alert[]> {
    const documents = await this.model.find({
      recipient: { $regex: recipient, $options: 'i' }
    }).sort({ createdAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }

  async findByRelatedEntity(entityType: string, entityId: string): Promise<Alert[]> {
    const documents = await this.model.find({
      relatedEntityType: entityType,
      relatedEntityId: entityId
    }).sort({ createdAt: -1 }).exec();
    
    return documents.map(doc => AlertMapper.toDomain(doc as any));
  }
}
