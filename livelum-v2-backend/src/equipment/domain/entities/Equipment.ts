import { EquipmentStatus, EquipmentType } from '../enums/EquipmentEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface EquipmentProps {
  id: string;
  name: string;
  type: EquipmentType;
  brand?: string;
  model?: string;
  serialNumber?: string;
  code?: string;
  physicalLocation?: string;
  status: EquipmentStatus;
  acquisitionDate?: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  responsible?: string;
  notes?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEquipmentPrimitives {
  name: string;
  type: EquipmentType;
  brand?: string;
  model?: string;
  serialNumber?: string;
  code?: string;
  physicalLocation?: string;
  acquisitionDate?: Date;
  responsible?: string;
  notes?: string;
  companyId: string;
}

export class Equipment {
  private constructor(private readonly props: EquipmentProps) {
    this.validate();
  }

  static create(primitives: CreateEquipmentPrimitives): Equipment {
    const now = new Date();
    
    return new Equipment({
      id: UniqueEntityID.create().value,
      name: primitives.name,
      type: primitives.type,
      brand: primitives.brand,
      model: primitives.model,
      serialNumber: primitives.serialNumber,
      code: primitives.code,
      physicalLocation: primitives.physicalLocation,
      status: EquipmentStatus.ACTIVE,
      acquisitionDate: primitives.acquisitionDate,
      responsible: primitives.responsible,
      notes: primitives.notes,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: EquipmentProps): Equipment {
    return new Equipment(primitives);
  }

  private validate(): void {
    if (!this.props.name || this.props.name.trim().length === 0) {
      throw new Error('El nombre del equipo es requerido');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  update(data: Partial<CreateEquipmentPrimitives>): void {
    if (data.name !== undefined) {
      this.props.name = data.name;
    }
    if (data.type !== undefined) {
      this.props.type = data.type;
    }
    if (data.brand !== undefined) {
      this.props.brand = data.brand;
    }
    if (data.model !== undefined) {
      this.props.model = data.model;
    }
    if (data.serialNumber !== undefined) {
      this.props.serialNumber = data.serialNumber;
    }
    if (data.code !== undefined) {
      this.props.code = data.code;
    }
    if (data.physicalLocation !== undefined) {
      this.props.physicalLocation = data.physicalLocation;
    }
    if (data.acquisitionDate !== undefined) {
      this.props.acquisitionDate = data.acquisitionDate;
    }
    if (data.responsible !== undefined) {
      this.props.responsible = data.responsible;
    }
    if (data.notes !== undefined) {
      this.props.notes = data.notes;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  changeStatus(status: EquipmentStatus): void {
    this.props.status = status;
    this.props.updatedAt = new Date();
  }

  sendToMaintenance(nextMaintenanceDate?: Date): void {
    this.props.status = EquipmentStatus.MAINTENANCE;
    this.props.lastMaintenanceDate = new Date();
    if (nextMaintenanceDate) {
      this.props.nextMaintenanceDate = nextMaintenanceDate;
    }
    this.props.updatedAt = new Date();
  }

  returnFromMaintenance(): void {
    this.props.status = EquipmentStatus.ACTIVE;
    this.props.updatedAt = new Date();
  }

  retire(): void {
    this.props.status = EquipmentStatus.RETIRED;
    this.props.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.props.status === EquipmentStatus.ACTIVE;
  }

  isInMaintenance(): boolean {
    return this.props.status === EquipmentStatus.MAINTENANCE;
  }

  needsMaintenance(): boolean {
    if (!this.props.nextMaintenanceDate) return false;
    return this.props.nextMaintenanceDate <= new Date();
  }

  toPrimitives(): EquipmentProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get status(): EquipmentStatus {
    return this.props.status;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}
