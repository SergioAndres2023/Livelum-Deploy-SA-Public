import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';
import { ControlStatus } from '../enums/FindingEnums';

export interface FindingControlProps {
  id: string;
  description: string;
  estimatedDate: Date;
  actualDate?: Date;
  status: ControlStatus;
  responsible: string;
  result?: string;
  comments?: string;
}

export class FindingControl {
  private constructor(private readonly props: FindingControlProps) {}

  static create(
    description: string,
    estimatedDate: Date,
    responsible: string,
    comments?: string
  ): FindingControl {
    return new FindingControl({
      id: UniqueEntityID.create().value,
      description,
      estimatedDate,
      responsible,
      status: ControlStatus.NOT_LOADED,
      comments,
    });
  }

  static fromPrimitives(props: FindingControlProps): FindingControl {
    return new FindingControl(props);
  }

  markAsPending(): void {
    this.props.status = ControlStatus.PENDING;
  }

  complete(actualDate: Date, result: string): void {
    this.props.actualDate = actualDate;
    this.props.result = result;
    this.props.status = ControlStatus.COMPLETED;
  }

  markAsNotPerformed(reason?: string): void {
    this.props.status = ControlStatus.NOT_PERFORMED;
    if (reason) {
      this.props.comments = (this.props.comments || '') + '\nNo realizado: ' + reason;
    }
  }

  isOverdue(): boolean {
    if (this.props.status === ControlStatus.COMPLETED) {
      return false;
    }
    return new Date() > this.props.estimatedDate;
  }

  toPrimitives(): FindingControlProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): ControlStatus {
    return this.props.status;
  }
}
