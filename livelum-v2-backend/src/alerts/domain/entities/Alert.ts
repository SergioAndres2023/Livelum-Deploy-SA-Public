import { AlertType, AlertStatus, AlertPriority, AlertCategory, AlertChannel } from '../enums/AlertEnums';
import { UniqueEntityID } from '../../../../src/cross-cutting/domain/valueObjects/UniqueEntityID';

export interface AlertProps {
  title: string;
  message: string;
  type: AlertType;
  status: AlertStatus;
  priority: AlertPriority;
  category: AlertCategory;
  channel: AlertChannel;
  recipient: string;
  sender: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  scheduledFor?: Date;
  sentAt?: Date;
  readAt?: Date;
  acknowledgedAt?: Date;
  dismissedAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export class Alert {
  private constructor(
    private props: AlertProps,
    private readonly _id: UniqueEntityID
  ) {}

  static create(props: Omit<AlertProps, 'status' | 'createdAt' | 'updatedAt'>, id?: string): Alert {
    const now = new Date();
    
    return new Alert(
      {
        ...props,
        status: AlertStatus.PENDING,
        createdAt: now,
        updatedAt: now,
      },
      id ? new UniqueEntityID(id) : new UniqueEntityID()
    );
  }

  static restore(props: AlertProps, id: string): Alert {
    return new Alert(props, new UniqueEntityID(id));
  }

  // Getters
  get id(): string {
    return this._id.toString();
  }

  get title(): string {
    return this.props.title;
  }

  get message(): string {
    return this.props.message;
  }

  get type(): AlertType {
    return this.props.type;
  }

  get status(): AlertStatus {
    return this.props.status;
  }

  get priority(): AlertPriority {
    return this.props.priority;
  }

  get category(): AlertCategory {
    return this.props.category;
  }

  get channel(): AlertChannel {
    return this.props.channel;
  }

  get recipient(): string {
    return this.props.recipient;
  }

  get sender(): string {
    return this.props.sender;
  }

  get relatedEntityType(): string | undefined {
    return this.props.relatedEntityType;
  }

  get relatedEntityId(): string | undefined {
    return this.props.relatedEntityId;
  }

  get scheduledFor(): Date | undefined {
    return this.props.scheduledFor;
  }

  get sentAt(): Date | undefined {
    return this.props.sentAt;
  }

  get readAt(): Date | undefined {
    return this.props.readAt;
  }

  get acknowledgedAt(): Date | undefined {
    return this.props.acknowledgedAt;
  }

  get dismissedAt(): Date | undefined {
    return this.props.dismissedAt;
  }

  get metadata(): Record<string, any> | undefined {
    return this.props.metadata;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateInfo(data: {
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
  }): void {
    if (data.title !== undefined) this.props.title = data.title;
    if (data.message !== undefined) this.props.message = data.message;
    if (data.type !== undefined) this.props.type = data.type;
    if (data.priority !== undefined) this.props.priority = data.priority;
    if (data.category !== undefined) this.props.category = data.category;
    if (data.channel !== undefined) this.props.channel = data.channel;
    if (data.recipient !== undefined) this.props.recipient = data.recipient;
    if (data.sender !== undefined) this.props.sender = data.sender;
    if (data.relatedEntityType !== undefined) this.props.relatedEntityType = data.relatedEntityType;
    if (data.relatedEntityId !== undefined) this.props.relatedEntityId = data.relatedEntityId;
    if (data.scheduledFor !== undefined) this.props.scheduledFor = data.scheduledFor;
    if (data.metadata !== undefined) this.props.metadata = data.metadata;

    this.props.updatedAt = new Date();
  }

  send(): void {
    if (this.props.status !== AlertStatus.PENDING) {
      throw new Error('Solo se pueden enviar alertas pendientes');
    }

    this.props.status = AlertStatus.SENT;
    this.props.sentAt = new Date();
    this.props.updatedAt = new Date();
  }

  markAsRead(): void {
    if (this.props.status !== AlertStatus.SENT) {
      throw new Error('Solo se pueden marcar como leídas alertas enviadas');
    }

    this.props.status = AlertStatus.READ;
    this.props.readAt = new Date();
    this.props.updatedAt = new Date();
  }

  acknowledge(): void {
    if (this.props.status !== AlertStatus.READ) {
      throw new Error('Solo se pueden confirmar alertas leídas');
    }

    this.props.status = AlertStatus.ACKNOWLEDGED;
    this.props.acknowledgedAt = new Date();
    this.props.updatedAt = new Date();
  }

  dismiss(): void {
    this.props.status = AlertStatus.DISMISSED;
    this.props.dismissedAt = new Date();
    this.props.updatedAt = new Date();
  }

  reschedule(newDate: Date): void {
    if (this.props.status !== AlertStatus.PENDING) {
      throw new Error('Solo se pueden reprogramar alertas pendientes');
    }

    this.props.scheduledFor = newDate;
    this.props.updatedAt = new Date();
  }

  // Status check methods
  isPending(): boolean {
    return this.props.status === AlertStatus.PENDING;
  }

  isSent(): boolean {
    return this.props.status === AlertStatus.SENT;
  }

  isRead(): boolean {
    return this.props.status === AlertStatus.READ;
  }

  isAcknowledged(): boolean {
    return this.props.status === AlertStatus.ACKNOWLEDGED;
  }

  isDismissed(): boolean {
    return this.props.status === AlertStatus.DISMISSED;
  }

  isActive(): boolean {
    return this.props.status !== AlertStatus.DISMISSED;
  }

  isOverdue(): boolean {
    if (!this.props.scheduledFor) return false;
    return this.props.scheduledFor < new Date() && this.props.status === AlertStatus.PENDING;
  }

  isHighPriority(): boolean {
    return this.props.priority === AlertPriority.HIGH || this.props.priority === AlertPriority.URGENT;
  }

  isCritical(): boolean {
    return this.props.type === AlertType.CRITICAL || this.props.priority === AlertPriority.URGENT;
  }

  getAgeInMinutes(): number {
    return Math.floor((new Date().getTime() - this.props.createdAt.getTime()) / (1000 * 60));
  }

  getTimeToSend(): number | null {
    if (!this.props.scheduledFor) return null;
    return Math.floor((this.props.scheduledFor.getTime() - new Date().getTime()) / (1000 * 60));
  }

  toPrimitives(): AlertProps & { id: string } {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
