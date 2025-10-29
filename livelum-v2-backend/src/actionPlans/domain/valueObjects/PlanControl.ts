import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';
import { PlanControlStatus } from '../enums/ActionPlanEnums';

export interface PlanControlProps {
  id: string;
  description: string;
  estimatedDate: Date;
  actualDate?: Date;
  status: PlanControlStatus;
  responsible: string;
  result?: string;
  comments?: string;
}

export class PlanControl {
  private constructor(private readonly props: PlanControlProps) {}

  static create(
    description: string,
    estimatedDate: Date,
    responsible: string,
    comments?: string
  ): PlanControl {
    return new PlanControl({
      id: UniqueEntityID.create().value,
      description,
      estimatedDate,
      responsible,
      status: PlanControlStatus.ESTIMATED,
      comments,
    });
  }

  static fromPrimitives(props: PlanControlProps): PlanControl {
    return new PlanControl(props);
  }

  markAsSatisfactory(actualDate: Date, result: string): void {
    this.props.actualDate = actualDate;
    this.props.result = result;
    this.props.status = PlanControlStatus.SATISFACTORY;
  }

  markAsUnsatisfactory(actualDate: Date, result: string): void {
    this.props.actualDate = actualDate;
    this.props.result = result;
    this.props.status = PlanControlStatus.UNSATISFACTORY;
  }

  markAsNotPerformed(reason?: string): void {
    this.props.status = PlanControlStatus.NOT_PERFORMED;
    if (reason) {
      this.props.comments = (this.props.comments || '') + '\nNo realizado: ' + reason;
    }
  }

  isOverdue(): boolean {
    if (this.props.status === PlanControlStatus.SATISFACTORY || 
        this.props.status === PlanControlStatus.UNSATISFACTORY) {
      return false;
    }
    return new Date() > this.props.estimatedDate;
  }

  toPrimitives(): PlanControlProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): PlanControlStatus {
    return this.props.status;
  }
}
