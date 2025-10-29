import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';
import { ActionStatus } from '../enums/FindingEnums';

export interface FindingActionProps {
  id: string;
  description: string;
  responsible: string;
  plannedDate: Date;
  completionDate?: Date;
  status: ActionStatus;
  evidence?: string;
  comments?: string;
}

export class FindingAction {
  private constructor(private readonly props: FindingActionProps) {}

  static create(
    description: string,
    responsible: string,
    plannedDate: Date,
    comments?: string
  ): FindingAction {
    return new FindingAction({
      id: UniqueEntityID.create().value,
      description,
      responsible,
      plannedDate,
      status: ActionStatus.PLANNED,
      comments,
    });
  }

  static fromPrimitives(props: FindingActionProps): FindingAction {
    return new FindingAction(props);
  }

  complete(completionDate: Date, evidence?: string): void {
    this.props.completionDate = completionDate;
    this.props.status = ActionStatus.COMPLETED;
    if (evidence) {
      this.props.evidence = evidence;
    }
  }

  markAsInProgress(): void {
    this.props.status = ActionStatus.IN_PROGRESS;
  }

  cancel(reason?: string): void {
    this.props.status = ActionStatus.CANCELLED;
    if (reason) {
      this.props.comments = (this.props.comments || '') + '\nCancelación: ' + reason;
    }
  }

  isOverdue(): boolean {
    if (this.props.status === ActionStatus.COMPLETED || this.props.status === ActionStatus.CANCELLED) {
      return false;
    }
    return new Date() > this.props.plannedDate;
  }

  toPrimitives(): FindingActionProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): ActionStatus {
    return this.props.status;
  }
}
