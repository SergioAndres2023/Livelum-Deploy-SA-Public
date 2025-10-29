import { SkillCategory, SkillStatus } from '../enums/SkillEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface SkillProps {
  id: string;
  number: number;
  title: string;
  description?: string;
  category: SkillCategory;
  status: SkillStatus;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSkillPrimitives {
  number: number;
  title: string;
  description?: string;
  category: SkillCategory;
  companyId: string;
}

export class Skill {
  private constructor(private readonly props: SkillProps) {
    this.validate();
  }

  static create(primitives: CreateSkillPrimitives): Skill {
    const now = new Date();
    
    return new Skill({
      id: UniqueEntityID.create().value,
      number: primitives.number,
      title: primitives.title,
      description: primitives.description,
      category: primitives.category,
      status: SkillStatus.ACTIVE,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: SkillProps): Skill {
    return new Skill(primitives);
  }

  private validate(): void {
    if (!this.props.title || this.props.title.trim().length === 0) {
      throw new Error('El título es requerido');
    }
    if (this.props.number < 1) {
      throw new Error('El número debe ser mayor a 0');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  update(data: Partial<CreateSkillPrimitives>): void {
    if (data.title !== undefined) {
      this.props.title = data.title;
    }
    if (data.description !== undefined) {
      this.props.description = data.description;
    }
    if (data.number !== undefined) {
      this.props.number = data.number;
    }
    if (data.category !== undefined) {
      this.props.category = data.category;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  activate(): void {
    this.props.status = SkillStatus.ACTIVE;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = SkillStatus.INACTIVE;
    this.props.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.props.status === SkillStatus.ACTIVE;
  }

  toPrimitives(): SkillProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get number(): number {
    return this.props.number;
  }

  get status(): SkillStatus {
    return this.props.status;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}
