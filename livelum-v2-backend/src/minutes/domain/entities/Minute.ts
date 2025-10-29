import { MinuteType, MinuteStatus } from '../enums/MinuteEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface MinuteProps {
  id: string;
  meetingDate: Date;
  title: string;
  type: MinuteType;
  status: MinuteStatus;
  participants: string[];
  participantIds?: string[];
  content: string;
  topics?: string[];
  agreements?: string[];
  actionItems?: string[];
  location?: string;
  duration?: number;
  nextMeetingDate?: Date;
  attachments?: string[];
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMinutePrimitives {
  meetingDate: Date;
  title: string;
  type: MinuteType;
  participants: string[];
  participantIds?: string[];
  content: string;
  topics?: string[];
  agreements?: string[];
  actionItems?: string[];
  location?: string;
  duration?: number;
  nextMeetingDate?: Date;
  createdBy: string;
  companyId: string;
}

export class Minute {
  private constructor(private readonly props: MinuteProps) {
    this.validate();
  }

  static create(primitives: CreateMinutePrimitives): Minute {
    const now = new Date();
    
    return new Minute({
      id: UniqueEntityID.create().value,
      meetingDate: primitives.meetingDate,
      title: primitives.title,
      type: primitives.type,
      status: MinuteStatus.DRAFT,
      participants: primitives.participants,
      participantIds: primitives.participantIds || [],
      content: primitives.content,
      topics: primitives.topics || [],
      agreements: primitives.agreements || [],
      actionItems: primitives.actionItems || [],
      location: primitives.location,
      duration: primitives.duration,
      nextMeetingDate: primitives.nextMeetingDate,
      attachments: [],
      createdBy: primitives.createdBy,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: MinuteProps): Minute {
    return new Minute(primitives);
  }

  private validate(): void {
    if (!this.props.title || this.props.title.trim().length === 0) {
      throw new Error('El título es requerido');
    }
    if (!this.props.content || this.props.content.trim().length === 0) {
      throw new Error('El contenido es requerido');
    }
    if (!this.props.participants || this.props.participants.length === 0) {
      throw new Error('Debe haber al menos un participante');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  update(data: Partial<CreateMinutePrimitives>): void {
    if (data.title !== undefined) {
      this.props.title = data.title;
    }
    if (data.meetingDate !== undefined) {
      this.props.meetingDate = data.meetingDate;
    }
    if (data.type !== undefined) {
      this.props.type = data.type;
    }
    if (data.content !== undefined) {
      this.props.content = data.content;
    }
    if (data.participants !== undefined) {
      this.props.participants = data.participants;
    }
    if (data.participantIds !== undefined) {
      this.props.participantIds = data.participantIds;
    }
    if (data.topics !== undefined) {
      this.props.topics = data.topics;
    }
    if (data.agreements !== undefined) {
      this.props.agreements = data.agreements;
    }
    if (data.actionItems !== undefined) {
      this.props.actionItems = data.actionItems;
    }
    if (data.location !== undefined) {
      this.props.location = data.location;
    }
    if (data.duration !== undefined) {
      this.props.duration = data.duration;
    }
    if (data.nextMeetingDate !== undefined) {
      this.props.nextMeetingDate = data.nextMeetingDate;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  publish(): void {
    if (this.props.status !== MinuteStatus.DRAFT) {
      throw new Error('Solo se pueden publicar minutas en estado borrador');
    }
    this.props.status = MinuteStatus.PUBLISHED;
    this.props.updatedAt = new Date();
  }

  approve(approvedBy: string): void {
    if (this.props.status !== MinuteStatus.PUBLISHED) {
      throw new Error('Solo se pueden aprobar minutas publicadas');
    }
    this.props.status = MinuteStatus.APPROVED;
    this.props.approvedBy = approvedBy;
    this.props.approvedAt = new Date();
    this.props.updatedAt = new Date();
  }

  archive(): void {
    this.props.status = MinuteStatus.ARCHIVED;
    this.props.updatedAt = new Date();
  }

  addAttachment(attachmentUrl: string): void {
    if (!this.props.attachments) {
      this.props.attachments = [];
    }
    this.props.attachments.push(attachmentUrl);
    this.props.updatedAt = new Date();
  }

  addTopic(topic: string): void {
    if (!this.props.topics) {
      this.props.topics = [];
    }
    this.props.topics.push(topic);
    this.props.updatedAt = new Date();
  }

  addAgreement(agreement: string): void {
    if (!this.props.agreements) {
      this.props.agreements = [];
    }
    this.props.agreements.push(agreement);
    this.props.updatedAt = new Date();
  }

  addActionItem(actionItem: string): void {
    if (!this.props.actionItems) {
      this.props.actionItems = [];
    }
    this.props.actionItems.push(actionItem);
    this.props.updatedAt = new Date();
  }

  isDraft(): boolean {
    return this.props.status === MinuteStatus.DRAFT;
  }

  isPublished(): boolean {
    return this.props.status === MinuteStatus.PUBLISHED;
  }

  isApproved(): boolean {
    return this.props.status === MinuteStatus.APPROVED;
  }

  isArchived(): boolean {
    return this.props.status === MinuteStatus.ARCHIVED;
  }

  toPrimitives(): MinuteProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get status(): MinuteStatus {
    return this.props.status;
  }

  get type(): MinuteType {
    return this.props.type;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}

