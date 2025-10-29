import { AuthorizationStatus, AuthorizationType } from '../enums/AuthorizationEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface AuthorizationProps {
  id: string;
  type: AuthorizationType;
  entityId: string;
  entityName: string;
  version: string;
  status: AuthorizationStatus;
  requestedBy: string;
  requestedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectedBy?: string;
  rejectedAt?: Date;
  comments?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAuthorizationPrimitives {
  type: AuthorizationType;
  entityId: string;
  entityName: string;
  version: string;
  requestedBy: string;
  comments?: string;
  companyId: string;
}

export class Authorization {
  private constructor(private readonly props: AuthorizationProps) {
    this.validate();
  }

  static create(primitives: CreateAuthorizationPrimitives): Authorization {
    const now = new Date();
    
    return new Authorization({
      id: UniqueEntityID.create().value,
      type: primitives.type,
      entityId: primitives.entityId,
      entityName: primitives.entityName,
      version: primitives.version,
      status: AuthorizationStatus.PENDING,
      requestedBy: primitives.requestedBy,
      requestedAt: now,
      comments: primitives.comments,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: AuthorizationProps): Authorization {
    return new Authorization(primitives);
  }

  private validate(): void {
    if (!this.props.entityId || this.props.entityId.trim().length === 0) {
      throw new Error('El ID de la entidad es requerido');
    }
    if (!this.props.entityName || this.props.entityName.trim().length === 0) {
      throw new Error('El nombre de la entidad es requerido');
    }
    if (!this.props.version || this.props.version.trim().length === 0) {
      throw new Error('La versión es requerida');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  approve(approvedBy: string, comments?: string): void {
    if (this.props.status !== AuthorizationStatus.PENDING) {
      throw new Error('Solo se pueden aprobar autorizaciones pendientes');
    }
    this.props.status = AuthorizationStatus.APPROVED;
    this.props.approvedBy = approvedBy;
    this.props.approvedAt = new Date();
    if (comments) {
      this.props.comments = (this.props.comments || '') + '\nAprobación: ' + comments;
    }
    this.props.updatedAt = new Date();
  }

  reject(rejectedBy: string, reason: string): void {
    if (this.props.status !== AuthorizationStatus.PENDING) {
      throw new Error('Solo se pueden rechazar autorizaciones pendientes');
    }
    this.props.status = AuthorizationStatus.REJECTED;
    this.props.rejectedBy = rejectedBy;
    this.props.rejectedAt = new Date();
    this.props.comments = (this.props.comments || '') + '\nRechazo: ' + reason;
    this.props.updatedAt = new Date();
  }

  cancel(reason?: string): void {
    this.props.status = AuthorizationStatus.CANCELLED;
    if (reason) {
      this.props.comments = (this.props.comments || '') + '\nCancelación: ' + reason;
    }
    this.props.updatedAt = new Date();
  }

  isPending(): boolean {
    return this.props.status === AuthorizationStatus.PENDING;
  }

  isApproved(): boolean {
    return this.props.status === AuthorizationStatus.APPROVED;
  }

  isRejected(): boolean {
    return this.props.status === AuthorizationStatus.REJECTED;
  }

  toPrimitives(): AuthorizationProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): AuthorizationStatus {
    return this.props.status;
  }

  get type(): AuthorizationType {
    return this.props.type;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}
