import { StakeholderType } from '../enums/StakeholderEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface StakeholderProps {
  id: string;
  numero: number;
  nombre: string;
  tipo: StakeholderType;
  requisitos: string;
  metodoEvaluacion: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStakeholderPrimitives {
  nombre: string;
  tipo: StakeholderType;
  requisitos: string;
  metodoEvaluacion: string;
  companyId: string;
}

export class Stakeholder {
  private constructor(private readonly props: StakeholderProps) {}

  static create(primitives: CreateStakeholderPrimitives, numero: number): Stakeholder {
    const now = new Date();
    
    return new Stakeholder({
      id: UniqueEntityID.create().value,
      numero,
      nombre: primitives.nombre,
      tipo: primitives.tipo,
      requisitos: primitives.requisitos,
      metodoEvaluacion: primitives.metodoEvaluacion,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: StakeholderProps): Stakeholder {
    return new Stakeholder(primitives);
  }

  update(data: Partial<CreateStakeholderPrimitives>): void {
    if (data.nombre !== undefined) {
      this.props.nombre = data.nombre;
    }
    if (data.tipo !== undefined) {
      this.props.tipo = data.tipo;
    }
    if (data.requisitos !== undefined) {
      this.props.requisitos = data.requisitos;
    }
    if (data.metodoEvaluacion !== undefined) {
      this.props.metodoEvaluacion = data.metodoEvaluacion;
    }
    
    this.props.updatedAt = new Date();
  }

  isInternal(): boolean {
    return this.props.tipo === StakeholderType.INTERNAL;
  }

  isExternal(): boolean {
    return this.props.tipo === StakeholderType.EXTERNAL;
  }

  toPrimitives(): StakeholderProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get numero(): number {
    return this.props.numero;
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get tipo(): StakeholderType {
    return this.props.tipo;
  }

  get requisitos(): string {
    return this.props.requisitos;
  }

  get metodoEvaluacion(): string {
    return this.props.metodoEvaluacion;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

