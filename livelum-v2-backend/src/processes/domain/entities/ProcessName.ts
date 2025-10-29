import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface ProcessNameProps {
  id: string;
  order: number;
  processTypeId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProcessNamePrimitives {
  order: number;
  processTypeId: string;
  name: string;
}

export class ProcessName {
  private constructor(private props: ProcessNameProps) {}

  static create(primitives: CreateProcessNamePrimitives): ProcessName {
    const now = new Date();
    const id = UniqueEntityID.createObjectId().toPrimitive();

    const props: ProcessNameProps = {
      id,
      order: primitives.order,
      processTypeId: primitives.processTypeId,
      name: primitives.name.trim(),
      createdAt: now,
      updatedAt: now,
    };

    this.validateProcessName(props);

    return new ProcessName(props);
  }

  static fromPrimitives(props: ProcessNameProps): ProcessName {
    return new ProcessName(props);
  }

  private static validateProcessName(props: ProcessNameProps): void {
    if (props.order < 1) {
      throw new Error('El orden debe ser mayor a 0');
    }

    if (!props.processTypeId || props.processTypeId.trim().length === 0) {
      throw new Error('El ID del tipo de proceso es requerido');
    }

    if (!props.name || props.name.length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get order(): number {
    return this.props.order;
  }

  get processTypeId(): string {
    return this.props.processTypeId;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  updateInfo(updates: Partial<CreateProcessNamePrimitives>): void {
    if (updates.order !== undefined) {
      this.props.order = updates.order;
    }
    if (updates.processTypeId) {
      this.props.processTypeId = updates.processTypeId;
    }
    if (updates.name) {
      this.props.name = updates.name.trim();
    }

    this.props.updatedAt = new Date();
    ProcessName.validateProcessName(this.props);
  }

  updateOrder(newOrder: number): void {
    if (newOrder < 1) {
      throw new Error('El orden debe ser mayor a 0');
    }
    this.props.order = newOrder;
    this.props.updatedAt = new Date();
  }

  updateProcessType(newProcessTypeId: string): void {
    if (!newProcessTypeId || newProcessTypeId.trim().length === 0) {
      throw new Error('El ID del tipo de proceso es requerido');
    }
    this.props.processTypeId = newProcessTypeId;
    this.props.updatedAt = new Date();
  }

  toPrimitives(): ProcessNameProps {
    return { ...this.props };
  }
}
