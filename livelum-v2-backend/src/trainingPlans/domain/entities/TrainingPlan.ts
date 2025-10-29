import { TrainingPlanType, TrainingPlanStatus } from '../enums/TrainingPlanEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface TrainingPlanProps {
  id: string;
  plannedDate: Date;
  topic: string;
  type: TrainingPlanType;
  completionDate?: Date;
  status: TrainingPlanStatus;
  instructor?: string;
  provider?: string;
  duration?: number;
  participants?: string[];
  participantIds?: string[];
  objectives?: string;
  evaluation?: string;
  comments?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTrainingPlanPrimitives {
  plannedDate: Date;
  topic: string;
  type: TrainingPlanType;
  instructor?: string;
  provider?: string;
  duration?: number;
  participants?: string[];
  participantIds?: string[];
  objectives?: string;
  companyId: string;
}

export class TrainingPlan {
  private constructor(private readonly props: TrainingPlanProps) {
    this.validate();
  }

  static create(primitives: CreateTrainingPlanPrimitives): TrainingPlan {
    const now = new Date();
    
    return new TrainingPlan({
      id: UniqueEntityID.create().value,
      plannedDate: primitives.plannedDate,
      topic: primitives.topic,
      type: primitives.type,
      status: TrainingPlanStatus.PENDING,
      instructor: primitives.instructor,
      provider: primitives.provider,
      duration: primitives.duration,
      participants: primitives.participants || [],
      participantIds: primitives.participantIds || [],
      objectives: primitives.objectives,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: TrainingPlanProps): TrainingPlan {
    return new TrainingPlan(primitives);
  }

  private validate(): void {
    if (!this.props.topic || this.props.topic.trim().length === 0) {
      throw new Error('El tema es requerido');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  update(data: Partial<CreateTrainingPlanPrimitives>): void {
    if (data.topic !== undefined) {
      this.props.topic = data.topic;
    }
    if (data.plannedDate !== undefined) {
      this.props.plannedDate = data.plannedDate;
    }
    if (data.type !== undefined) {
      this.props.type = data.type;
    }
    if (data.instructor !== undefined) {
      this.props.instructor = data.instructor;
    }
    if (data.provider !== undefined) {
      this.props.provider = data.provider;
    }
    if (data.duration !== undefined) {
      this.props.duration = data.duration;
    }
    if (data.participants !== undefined) {
      this.props.participants = data.participants;
    }
    if (data.participantIds !== undefined) {
      this.props.participantIds = data.participantIds;
    }
    if (data.objectives !== undefined) {
      this.props.objectives = data.objectives;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  completeSatisfactory(completionDate: Date, evaluation: string): void {
    this.props.completionDate = completionDate;
    this.props.status = TrainingPlanStatus.COMPLETED_SATISFACTORY;
    this.props.evaluation = evaluation;
    this.props.updatedAt = new Date();
  }

  completeUnsatisfactory(completionDate: Date, evaluation: string): void {
    this.props.completionDate = completionDate;
    this.props.status = TrainingPlanStatus.COMPLETED_UNSATISFACTORY;
    this.props.evaluation = evaluation;
    this.props.updatedAt = new Date();
  }

  markAsInProgress(): void {
    this.props.status = TrainingPlanStatus.IN_PROGRESS;
    this.props.updatedAt = new Date();
  }

  cancel(reason?: string): void {
    this.props.status = TrainingPlanStatus.CANCELLED;
    if (reason) {
      this.props.comments = (this.props.comments || '') + '\nCancelación: ' + reason;
    }
    this.props.updatedAt = new Date();
  }

  addParticipant(participantName: string, participantId?: string): void {
    if (!this.props.participants) {
      this.props.participants = [];
    }
    if (!this.props.participantIds) {
      this.props.participantIds = [];
    }
    
    this.props.participants.push(participantName);
    if (participantId) {
      this.props.participantIds.push(participantId);
    }
    this.props.updatedAt = new Date();
  }

  isPending(): boolean {
    return this.props.status === TrainingPlanStatus.PENDING;
  }

  isInProgress(): boolean {
    return this.props.status === TrainingPlanStatus.IN_PROGRESS;
  }

  isCompleted(): boolean {
    return this.props.status === TrainingPlanStatus.COMPLETED_SATISFACTORY || 
           this.props.status === TrainingPlanStatus.COMPLETED_UNSATISFACTORY;
  }

  isOverdue(): boolean {
    if (this.isCompleted() || this.props.status === TrainingPlanStatus.CANCELLED) {
      return false;
    }
    return new Date() > this.props.plannedDate;
  }

  toPrimitives(): TrainingPlanProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get topic(): string {
    return this.props.topic;
  }

  get status(): TrainingPlanStatus {
    return this.props.status;
  }

  get type(): TrainingPlanType {
    return this.props.type;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}

