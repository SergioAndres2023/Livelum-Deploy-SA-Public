import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';
import { PlanActionStatus } from '../enums/ActionPlanEnums';

export interface PlanActionProps {
  id: string;
  description: string;
  responsible: string;
  plannedDate: Date;
  completionDate?: Date;
  status: PlanActionStatus;
  evidence?: string;
  comments?: string;
}

export class PlanAction {
  private constructor(private readonly props: PlanActionProps) {}

  static create(
    description: string,
    responsible: string,
    plannedDate: Date,
    comments?: string
  ): PlanAction {
    return new PlanAction({
      id: UniqueEntityID.create().value,
      description,
      responsible,
      plannedDate,
      status: PlanActionStatus.PLANNED,
      comments,
    });
  }

  static fromPrimitives(props: PlanActionProps): PlanAction {
    return new PlanAction(props);
  }

  complete(completionDate: Date, evidence?: string): void {
    this.props.completionDate = completionDate;
    this.props.status = PlanActionStatus.COMPLETED;
    if (evidence) {
      this.props.evidence = evidence;
    }
  }

  markAsInProgress(): void {
    this.props.status = PlanActionStatus.IN_PROGRESS;
  }

  cancel(reason?: string): void {
    this.props.status = PlanActionStatus.CANCELLED;
    if (reason) {
      this.props.comments = (this.props.comments || '') + '\nCancelación: ' + reason;
    }
  }

  isOverdue(): boolean {
    if (this.props.status === PlanActionStatus.COMPLETED || this.props.status === PlanActionStatus.CANCELLED) {
      return false;
    }
    return new Date() > this.props.plannedDate;
  }

  toPrimitives(): PlanActionProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): PlanActionStatus {
    return this.props.status;
  }
}
