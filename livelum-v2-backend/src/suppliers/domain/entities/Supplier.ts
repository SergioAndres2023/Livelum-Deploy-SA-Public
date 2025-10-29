import { SupplierStatus } from '../enums/SupplierEnums';
import { SupplierContact, SupplierContactProps } from '../valueObjects/SupplierContact';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface SupplierProps {
  id: string;
  rubro: string;
  proveedor: string;
  contacto: SupplierContactProps;
  ultimaEvaluacion?: Date;
  siguienteEvaluacion?: Date;
  estado: SupplierStatus;
  evaluacion: number;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSupplierPrimitives {
  rubro: string;
  proveedor: string;
  contacto: SupplierContactProps;
  ultimaEvaluacion?: Date;
  siguienteEvaluacion?: Date;
  evaluacion?: number;
  companyId: string;
}

export class Supplier {
  private contactoVO: SupplierContact;

  private constructor(private readonly props: SupplierProps) {
    this.contactoVO = SupplierContact.fromPrimitives(props.contacto);
    this.validate();
  }

  static create(primitives: CreateSupplierPrimitives): Supplier {
    const now = new Date();
    const evaluacion = primitives.evaluacion ?? 0;
    
    return new Supplier({
      id: UniqueEntityID.create().value,
      rubro: primitives.rubro,
      proveedor: primitives.proveedor,
      contacto: primitives.contacto,
      ultimaEvaluacion: primitives.ultimaEvaluacion,
      siguienteEvaluacion: primitives.siguienteEvaluacion,
      estado: Supplier.calculateStatus(evaluacion),
      evaluacion,
      companyId: primitives.companyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: SupplierProps): Supplier {
    return new Supplier(primitives);
  }

  private validate(): void {
    if (!this.props.rubro || this.props.rubro.trim().length === 0) {
      throw new Error('El rubro es requerido');
    }
    if (!this.props.proveedor || this.props.proveedor.trim().length === 0) {
      throw new Error('El nombre del proveedor es requerido');
    }
    if (this.props.evaluacion < 0 || this.props.evaluacion > 10) {
      throw new Error('La evaluación debe estar entre 0 y 10');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
  }

  private static calculateStatus(evaluacion: number): SupplierStatus {
    if (evaluacion >= 7) {
      return SupplierStatus.APPROVED;
    } else if (evaluacion >= 5) {
      return SupplierStatus.CONDITIONAL;
    } else {
      return SupplierStatus.NOT_APPROVED;
    }
  }

  update(data: Partial<CreateSupplierPrimitives>): void {
    if (data.rubro !== undefined) {
      this.props.rubro = data.rubro;
    }
    if (data.proveedor !== undefined) {
      this.props.proveedor = data.proveedor;
    }
    if (data.contacto !== undefined) {
      this.contactoVO = SupplierContact.fromPrimitives(data.contacto);
      this.props.contacto = data.contacto;
    }
    if (data.ultimaEvaluacion !== undefined) {
      this.props.ultimaEvaluacion = data.ultimaEvaluacion;
    }
    if (data.siguienteEvaluacion !== undefined) {
      this.props.siguienteEvaluacion = data.siguienteEvaluacion;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  updateEvaluation(evaluacion: number, ultimaEvaluacion?: Date, siguienteEvaluacion?: Date): void {
    if (evaluacion < 0 || evaluacion > 10) {
      throw new Error('La evaluación debe estar entre 0 y 10');
    }

    this.props.evaluacion = evaluacion;
    this.props.estado = Supplier.calculateStatus(evaluacion);
    
    if (ultimaEvaluacion) {
      this.props.ultimaEvaluacion = ultimaEvaluacion;
    }
    if (siguienteEvaluacion) {
      this.props.siguienteEvaluacion = siguienteEvaluacion;
    }
    
    this.props.updatedAt = new Date();
  }

  changeStatus(estado: SupplierStatus): void {
    this.props.estado = estado;
    this.props.updatedAt = new Date();
  }

  isApproved(): boolean {
    return this.props.estado === SupplierStatus.APPROVED;
  }

  isConditional(): boolean {
    return this.props.estado === SupplierStatus.CONDITIONAL;
  }

  isNotApproved(): boolean {
    return this.props.estado === SupplierStatus.NOT_APPROVED;
  }

  isEvaluationOverdue(): boolean {
    if (!this.props.siguienteEvaluacion) return false;
    return new Date() > this.props.siguienteEvaluacion;
  }

  getDaysUntilNextEvaluation(): number | null {
    if (!this.props.siguienteEvaluacion) return null;
    const today = new Date();
    const diff = this.props.siguienteEvaluacion.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  toPrimitives(): SupplierProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get rubro(): string {
    return this.props.rubro;
  }

  get proveedor(): string {
    return this.props.proveedor;
  }

  get contacto(): SupplierContact {
    return this.contactoVO;
  }

  get ultimaEvaluacion(): Date | undefined {
    return this.props.ultimaEvaluacion;
  }

  get siguienteEvaluacion(): Date | undefined {
    return this.props.siguienteEvaluacion;
  }

  get estado(): SupplierStatus {
    return this.props.estado;
  }

  get evaluacion(): number {
    return this.props.evaluacion;
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

