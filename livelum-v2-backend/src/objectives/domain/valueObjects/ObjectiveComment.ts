import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';
import { ActionStatus } from '../enums/ObjectiveEnums';

export interface ObjectiveCommentProps {
  id: string;
  text: string;
  actionRequired: boolean;
  actionDescription?: string;
  actionDueDate?: Date;
  actionStatus?: ActionStatus;
  createdBy: string;
  createdAt: Date;
}

export class ObjectiveComment {
  private constructor(private readonly props: ObjectiveCommentProps) {}

  static create(
    text: string,
    createdBy: string,
    actionRequired: boolean = false,
    actionDescription?: string,
    actionDueDate?: Date
  ): ObjectiveComment {
    return new ObjectiveComment({
      id: UniqueEntityID.create().value,
      text,
      actionRequired,
      actionDescription,
      actionDueDate,
      actionStatus: actionRequired ? ActionStatus.PENDING : undefined,
      createdBy,
      createdAt: new Date(),
    });
  }

  static fromPrimitives(props: ObjectiveCommentProps): ObjectiveComment {
    return new ObjectiveComment(props);
  }

  /**
   * Actualiza el estado de la acción
   */
  updateActionStatus(newStatus: ActionStatus): void {
    if (this.props.actionRequired) {
      (this.props as any).actionStatus = newStatus;
    }
  }

  /**
   * Verifica si la acción está pendiente
   */
  isActionPending(): boolean {
    return this.props.actionRequired && this.props.actionStatus === ActionStatus.PENDING;
  }

  /**
   * Verifica si la acción está completada
   */
  isActionCompleted(): boolean {
    return this.props.actionRequired && this.props.actionStatus === ActionStatus.COMPLETED;
  }

  /**
   * Verifica si la acción está vencida
   */
  isActionOverdue(): boolean {
    if (!this.props.actionRequired || !this.props.actionDueDate) {
      return false;
    }
    return this.props.actionDueDate < new Date() && 
           this.props.actionStatus !== ActionStatus.COMPLETED;
  }

  toPrimitives(): ObjectiveCommentProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get text(): string {
    return this.props.text;
  }

  get actionRequired(): boolean {
    return this.props.actionRequired;
  }

  get actionDescription(): string | undefined {
    return this.props.actionDescription;
  }

  get actionDueDate(): Date | undefined {
    return this.props.actionDueDate;
  }

  get actionStatus(): ActionStatus | undefined {
    return this.props.actionStatus;
  }

  get createdBy(): string {
    return this.props.createdBy;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

