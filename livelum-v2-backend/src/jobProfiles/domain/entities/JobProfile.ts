import { JobProfileStatus, OrganizationalLevel } from '../enums/JobProfileEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface JobProfileProps {
  id: string;
  organizationalChart: number;
  name: string;
  description: string;
  supervisorUserId?: string;
  supervisorUserName?: string;
  parentJobProfileId?: string;
  parentJobProfileName?: string;
  organizationalLevel: OrganizationalLevel;
  status: JobProfileStatus;
  responsibilities?: string[];
  requirements?: string[];
  competencies?: string[];
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobProfilePrimitives {
  organizationalChart: number;
  name: string;
  description: string;
  supervisorUserId?: string;
  supervisorUserName?: string;
  parentJobProfileId?: string;
  parentJobProfileName?: string;
  organizationalLevel: OrganizationalLevel;
  responsibilities?: string[];
  requirements?: string[];
  competencies?: string[];
  companyId: string;
}

export class JobProfile {
  private constructor(private readonly props: JobProfileProps) {
    this.validate();
  }

  static create(primitives: CreateJobProfilePrimitives): JobProfile {
    const now = new Date();
    
    return new JobProfile({
      id: UniqueEntityID.create().value,
      organizationalChart: primitives.organizationalChart,
      name: primitives.name,
      description: primitives.description,
      supervisorUserId: primitives.supervisorUserId,
      supervisorUserName: primitives.supervisorUserName,
      parentJobProfileId: primitives.parentJobProfileId,
      parentJobProfileName: primitives.parentJobProfileName,
      organizationalLevel: primitives.organizationalLevel,
      status: JobProfileStatus.ACTIVE,
      responsibilities: primitives.responsibilities || [],
      requirements: primitives.requirements || [],
      competencies: primitives.competencies || [],
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: JobProfileProps): JobProfile {
    return new JobProfile(primitives);
  }

  private validate(): void {
    if (!this.props.name || this.props.name.trim().length === 0) {
      throw new Error('El nombre del puesto es requerido');
    }
    if (this.props.organizationalChart < 1) {
      throw new Error('El nivel de organigrama debe ser mayor a 0');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  update(data: Partial<CreateJobProfilePrimitives>): void {
    if (data.name !== undefined) {
      this.props.name = data.name;
    }
    if (data.description !== undefined) {
      this.props.description = data.description;
    }
    if (data.organizationalChart !== undefined) {
      this.props.organizationalChart = data.organizationalChart;
    }
    if (data.supervisorUserId !== undefined) {
      this.props.supervisorUserId = data.supervisorUserId;
    }
    if (data.supervisorUserName !== undefined) {
      this.props.supervisorUserName = data.supervisorUserName;
    }
    if (data.parentJobProfileId !== undefined) {
      this.props.parentJobProfileId = data.parentJobProfileId;
    }
    if (data.parentJobProfileName !== undefined) {
      this.props.parentJobProfileName = data.parentJobProfileName;
    }
    if (data.organizationalLevel !== undefined) {
      this.props.organizationalLevel = data.organizationalLevel;
    }
    if (data.responsibilities !== undefined) {
      this.props.responsibilities = data.responsibilities;
    }
    if (data.requirements !== undefined) {
      this.props.requirements = data.requirements;
    }
    if (data.competencies !== undefined) {
      this.props.competencies = data.competencies;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  addResponsibility(responsibility: string): void {
    if (!this.props.responsibilities) {
      this.props.responsibilities = [];
    }
    this.props.responsibilities.push(responsibility);
    this.props.updatedAt = new Date();
  }

  addRequirement(requirement: string): void {
    if (!this.props.requirements) {
      this.props.requirements = [];
    }
    this.props.requirements.push(requirement);
    this.props.updatedAt = new Date();
  }

  addCompetency(competency: string): void {
    if (!this.props.competencies) {
      this.props.competencies = [];
    }
    this.props.competencies.push(competency);
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.status = JobProfileStatus.ACTIVE;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = JobProfileStatus.INACTIVE;
    this.props.updatedAt = new Date();
  }

  markAsDraft(): void {
    this.props.status = JobProfileStatus.DRAFT;
    this.props.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.props.status === JobProfileStatus.ACTIVE;
  }

  isInactive(): boolean {
    return this.props.status === JobProfileStatus.INACTIVE;
  }

  isDraft(): boolean {
    return this.props.status === JobProfileStatus.DRAFT;
  }

  hasParent(): boolean {
    return !!this.props.parentJobProfileId;
  }

  hasSupervisor(): boolean {
    return !!this.props.supervisorUserId;
  }

  toPrimitives(): JobProfileProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get status(): JobProfileStatus {
    return this.props.status;
  }

  get organizationalLevel(): OrganizationalLevel {
    return this.props.organizationalLevel;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}

