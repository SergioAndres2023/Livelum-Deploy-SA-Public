import { AuditType, AuditStatus } from '../enums/AuditEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface AuditProps {
  id: string;
  title: string;
  auditType: AuditType;
  status: AuditStatus;
  plannedDate: Date;
  actualDate?: Date;
  auditorName: string;
  scope: string;
  findings?: string;
  recommendations?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAuditPrimitives {
  title: string;
  auditType: AuditType;
  plannedDate: Date;
  auditorName: string;
  scope: string;
}

export class Audit {
  private constructor(private props: AuditProps) {}

  static create(primitives: CreateAuditPrimitives): Audit {
    const now = new Date();
    const id = UniqueEntityID.createObjectId().toPrimitive();

    const props: AuditProps = {
      id,
      title: primitives.title.trim(),
      auditType: primitives.auditType,
      status: AuditStatus.PLANNED,
      plannedDate: primitives.plannedDate,
      auditorName: primitives.auditorName.trim(),
      scope: primitives.scope.trim(),
      createdAt: now,
      updatedAt: now,
    };

    this.validateAudit(props);

    return new Audit(props);
  }

  static fromPrimitives(props: AuditProps): Audit {
    return new Audit(props);
  }

  private static validateAudit(props: AuditProps): void {
    if (!props.title || props.title.length < 3) {
      throw new Error('El título debe tener al menos 3 caracteres');
    }

    if (!props.auditorName || props.auditorName.length < 2) {
      throw new Error('El nombre del auditor debe tener al menos 2 caracteres');
    }

    if (!props.scope || props.scope.length < 10) {
      throw new Error('El alcance debe tener al menos 10 caracteres');
    }

    if (props.plannedDate <= new Date()) {
      throw new Error('La fecha planificada debe ser en el futuro');
    }

    if (props.actualDate && props.actualDate < props.plannedDate) {
      throw new Error('La fecha real no puede ser anterior a la fecha planificada');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get auditType(): AuditType {
    return this.props.auditType;
  }

  get status(): AuditStatus {
    return this.props.status;
  }

  get plannedDate(): Date {
    return this.props.plannedDate;
  }

  get actualDate(): Date | undefined {
    return this.props.actualDate;
  }

  get auditorName(): string {
    return this.props.auditorName;
  }

  get scope(): string {
    return this.props.scope;
  }

  get findings(): string | undefined {
    return this.props.findings;
  }

  get recommendations(): string | undefined {
    return this.props.recommendations;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  updateInfo(updates: Partial<CreateAuditPrimitives>): void {
    if (updates.title) {
      this.props.title = updates.title.trim();
    }
    if (updates.auditType) {
      this.props.auditType = updates.auditType;
    }
    if (updates.plannedDate) {
      this.props.plannedDate = updates.plannedDate;
    }
    if (updates.auditorName) {
      this.props.auditorName = updates.auditorName.trim();
    }
    if (updates.scope) {
      this.props.scope = updates.scope.trim();
    }

    this.props.updatedAt = new Date();
    Audit.validateAudit(this.props);
  }

  start(): void {
    if (this.props.status !== AuditStatus.PLANNED) {
      throw new Error('Solo se pueden iniciar auditorías planificadas');
    }
    this.props.status = AuditStatus.IN_PROGRESS;
    this.props.updatedAt = new Date();
  }

  complete(actualDate: Date, findings?: string, recommendations?: string): void {
    if (this.props.status !== AuditStatus.IN_PROGRESS) {
      throw new Error('Solo se pueden completar auditorías en progreso');
    }

    if (actualDate < this.props.plannedDate) {
      throw new Error('La fecha real no puede ser anterior a la fecha planificada');
    }

    this.props.status = AuditStatus.COMPLETED;
    this.props.actualDate = actualDate;
    this.props.findings = findings?.trim();
    this.props.recommendations = recommendations?.trim();
    this.props.updatedAt = new Date();
  }

  cancel(): void {
    if (this.props.status === AuditStatus.COMPLETED) {
      throw new Error('No se puede cancelar una auditoría completada');
    }
    this.props.status = AuditStatus.CANCELLED;
    this.props.updatedAt = new Date();
  }

  reschedule(newPlannedDate: Date): void {
    if (this.props.status === AuditStatus.COMPLETED || this.props.status === AuditStatus.CANCELLED) {
      throw new Error('No se puede reprogramar una auditoría completada o cancelada');
    }

    if (newPlannedDate <= new Date()) {
      throw new Error('La nueva fecha planificada debe ser en el futuro');
    }

    this.props.plannedDate = newPlannedDate;
    this.props.updatedAt = new Date();
  }

  addFindings(findings: string): void {
    if (this.props.status !== AuditStatus.IN_PROGRESS && this.props.status !== AuditStatus.COMPLETED) {
      throw new Error('Solo se pueden agregar hallazgos a auditorías en progreso o completadas');
    }
    this.props.findings = findings.trim();
    this.props.updatedAt = new Date();
  }

  addRecommendations(recommendations: string): void {
    if (this.props.status !== AuditStatus.IN_PROGRESS && this.props.status !== AuditStatus.COMPLETED) {
      throw new Error('Solo se pueden agregar recomendaciones a auditorías en progreso o completadas');
    }
    this.props.recommendations = recommendations.trim();
    this.props.updatedAt = new Date();
  }

  isOverdue(): boolean {
    if (this.props.status === AuditStatus.COMPLETED || this.props.status === AuditStatus.CANCELLED) {
      return false;
    }
    return new Date() > this.props.plannedDate;
  }

  isUpcoming(daysAhead: number = 7): boolean {
    if (this.props.status !== AuditStatus.PLANNED) {
      return false;
    }
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + daysAhead);
    return this.props.plannedDate <= thresholdDate && this.props.plannedDate > new Date();
  }

  getDaysUntilPlanned(): number {
    const now = new Date();
    const diffTime = this.props.plannedDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysOverdue(): number {
    if (!this.isOverdue()) {
      return 0;
    }
    const now = new Date();
    const diffTime = now.getTime() - this.props.plannedDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  toPrimitives(): AuditProps {
    return { ...this.props };
  }
}
