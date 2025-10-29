import { ObjectiveStatus } from '../enums/ObjectiveEnums';
import { ObjectiveComment, ObjectiveCommentProps } from '../valueObjects/ObjectiveComment';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface ObjectiveProps {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: Date;
  targetDate: Date;
  status: ObjectiveStatus;
  indicatorId?: string;
  indicatorName?: string;
  responsibleUserId: string;
  responsibleUserName: string;
  companyId: string;
  comments: ObjectiveComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateObjectivePrimitives {
  title: string;
  description: string;
  targetValue: number;
  currentValue?: number;
  unit: string;
  startDate: Date;
  targetDate: Date;
  indicatorId?: string;
  indicatorName?: string;
  responsibleUserId: string;
  responsibleUserName: string;
  companyId: string;
}

export class Objective {
  private constructor(private readonly props: ObjectiveProps) {}

  /**
   * Crea una nueva instancia de Objective
   */
  static create(primitives: CreateObjectivePrimitives): Objective {
    const now = new Date();
    
    return new Objective({
      id: UniqueEntityID.create().value,
      title: primitives.title,
      description: primitives.description,
      targetValue: primitives.targetValue,
      currentValue: primitives.currentValue || 0,
      unit: primitives.unit,
      startDate: primitives.startDate,
      targetDate: primitives.targetDate,
      status: ObjectiveStatus.ACTIVE,
      indicatorId: primitives.indicatorId,
      indicatorName: primitives.indicatorName,
      responsibleUserId: primitives.responsibleUserId,
      responsibleUserName: primitives.responsibleUserName,
      companyId: primitives.companyId,
      comments: [],
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Reconstruye una instancia de Objective desde persistencia
   */
  static fromPrimitives(primitives: Omit<ObjectiveProps, 'comments'> & { comments: ObjectiveCommentProps[] }): Objective {
    const comments = primitives.comments.map(c => ObjectiveComment.fromPrimitives(c));
    
    return new Objective({
      ...primitives,
      comments,
    });
  }

  /**
   * Actualiza los datos del objetivo
   */
  update(data: Partial<CreateObjectivePrimitives>): void {
    if (data.title !== undefined) {
      this.props.title = data.title;
    }
    if (data.description !== undefined) {
      this.props.description = data.description;
    }
    if (data.targetValue !== undefined) {
      this.props.targetValue = data.targetValue;
    }
    if (data.unit !== undefined) {
      this.props.unit = data.unit;
    }
    if (data.startDate !== undefined) {
      this.props.startDate = data.startDate;
    }
    if (data.targetDate !== undefined) {
      this.props.targetDate = data.targetDate;
    }
    if (data.indicatorId !== undefined) {
      this.props.indicatorId = data.indicatorId;
    }
    if (data.indicatorName !== undefined) {
      this.props.indicatorName = data.indicatorName;
    }
    if (data.responsibleUserId !== undefined) {
      this.props.responsibleUserId = data.responsibleUserId;
    }
    if (data.responsibleUserName !== undefined) {
      this.props.responsibleUserName = data.responsibleUserName;
    }
    
    this.props.updatedAt = new Date();
  }

  /**
   * Actualiza el valor actual del objetivo
   */
  updateCurrentValue(newValue: number): void {
    this.props.currentValue = newValue;
    this.props.updatedAt = new Date();

    // Si alcanzamos el target, completar automáticamente
    if (newValue >= this.props.targetValue && this.isActive()) {
      this.complete();
    }
  }

  /**
   * Cambia el estado del objetivo
   */
  changeStatus(newStatus: ObjectiveStatus): void {
    this.props.status = newStatus;
    this.props.updatedAt = new Date();
  }

  /**
   * Marca el objetivo como completado
   */
  complete(): void {
    this.changeStatus(ObjectiveStatus.COMPLETED);
  }

  /**
   * Pausa el objetivo
   */
  pause(): void {
    this.changeStatus(ObjectiveStatus.PAUSED);
  }

  /**
   * Reactiva el objetivo
   */
  reactivate(): void {
    this.changeStatus(ObjectiveStatus.ACTIVE);
  }

  /**
   * Cancela el objetivo
   */
  cancel(): void {
    this.changeStatus(ObjectiveStatus.CANCELLED);
  }

  /**
   * Agrega un comentario al objetivo
   */
  addComment(comment: ObjectiveComment): void {
    this.props.comments.push(comment);
    this.props.updatedAt = new Date();
  }

  /**
   * Actualiza un comentario existente
   */
  updateComment(commentId: string, newActionStatus: string): void {
    const comment = this.props.comments.find(c => c.id === commentId);
    if (comment && comment.actionRequired) {
      comment.updateActionStatus(newActionStatus as any);
      this.props.updatedAt = new Date();
    }
  }

  /**
   * Calcula el progreso como porcentaje
   */
  getProgress(): number {
    if (this.props.targetValue === 0) return 0;
    return Math.min((this.props.currentValue / this.props.targetValue) * 100, 100);
  }

  /**
   * Verifica si el objetivo está activo
   */
  isActive(): boolean {
    return this.props.status === ObjectiveStatus.ACTIVE;
  }

  /**
   * Verifica si el objetivo está completado
   */
  isCompleted(): boolean {
    return this.props.status === ObjectiveStatus.COMPLETED;
  }

  /**
   * Verifica si el objetivo está pausado
   */
  isPaused(): boolean {
    return this.props.status === ObjectiveStatus.PAUSED;
  }

  /**
   * Verifica si el objetivo está cancelado
   */
  isCancelled(): boolean {
    return this.props.status === ObjectiveStatus.CANCELLED;
  }

  /**
   * Verifica si el objetivo está vencido
   */
  isOverdue(): boolean {
    return this.props.targetDate < new Date() && 
           this.isActive() && 
           !this.isCompleted();
  }

  /**
   * Obtiene el número de días restantes
   */
  getDaysRemaining(): number {
    const today = new Date();
    const diffTime = this.props.targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 0);
  }

  /**
   * Obtiene comentarios con acciones pendientes
   */
  getPendingActionComments(): ObjectiveComment[] {
    return this.props.comments.filter(c => c.isActionPending());
  }

  /**
   * Obtiene comentarios con acciones vencidas
   */
  getOverdueActionComments(): ObjectiveComment[] {
    return this.props.comments.filter(c => c.isActionOverdue());
  }

  /**
   * Verifica si hay acciones pendientes
   */
  hasPendingActions(): boolean {
    return this.getPendingActionComments().length > 0;
  }

  /**
   * Verifica si hay acciones vencidas
   */
  hasOverdueActions(): boolean {
    return this.getOverdueActionComments().length > 0;
  }

  /**
   * Retorna las primitivas del objeto
   */
  toPrimitives(): Omit<ObjectiveProps, 'comments'> & { comments: ObjectiveCommentProps[] } {
    return {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      targetValue: this.props.targetValue,
      currentValue: this.props.currentValue,
      unit: this.props.unit,
      startDate: this.props.startDate,
      targetDate: this.props.targetDate,
      status: this.props.status,
      indicatorId: this.props.indicatorId,
      indicatorName: this.props.indicatorName,
      responsibleUserId: this.props.responsibleUserId,
      responsibleUserName: this.props.responsibleUserName,
      companyId: this.props.companyId,
      comments: this.props.comments.map((c: ObjectiveComment) => c.toPrimitives()),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get targetValue(): number {
    return this.props.targetValue;
  }

  get currentValue(): number {
    return this.props.currentValue;
  }

  get unit(): string {
    return this.props.unit;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get targetDate(): Date {
    return this.props.targetDate;
  }

  get status(): ObjectiveStatus {
    return this.props.status;
  }

  get indicatorId(): string | undefined {
    return this.props.indicatorId;
  }

  get indicatorName(): string | undefined {
    return this.props.indicatorName;
  }

  get responsibleUserId(): string {
    return this.props.responsibleUserId;
  }

  get responsibleUserName(): string {
    return this.props.responsibleUserName;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get comments(): ObjectiveComment[] {
    return [...this.props.comments];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

