import { CompanyStatus } from '../enums/CompanyEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface CompanyProps {
  id: string;
  razonSocial: string;
  nombreFantasia: string;
  cuit: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  website?: string;
  logo?: string;
  status: CompanyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyPrimitives {
  razonSocial: string;
  nombreFantasia: string;
  cuit: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  website?: string;
  logo?: string;
}

export class Company {
  private constructor(private readonly props: CompanyProps) {}

  /**
   * Crea una nueva instancia de Company
   */
  static create(primitives: CreateCompanyPrimitives): Company {
    const now = new Date();
    
    return new Company({
      id: UniqueEntityID.create().value,
      razonSocial: primitives.razonSocial,
      nombreFantasia: primitives.nombreFantasia,
      cuit: primitives.cuit,
      direccion: primitives.direccion,
      ciudad: primitives.ciudad,
      provincia: primitives.provincia,
      codigoPostal: primitives.codigoPostal,
      telefono: primitives.telefono,
      email: primitives.email,
      website: primitives.website,
      logo: primitives.logo,
      status: CompanyStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Reconstruye una instancia de Company desde persistencia
   */
  static fromPrimitives(primitives: CompanyProps): Company {
    return new Company(primitives);
  }

  /**
   * Actualiza los datos de la empresa
   */
  update(data: Partial<CreateCompanyPrimitives>): void {
    if (data.razonSocial !== undefined) {
      this.props.razonSocial = data.razonSocial;
    }
    if (data.nombreFantasia !== undefined) {
      this.props.nombreFantasia = data.nombreFantasia;
    }
    if (data.cuit !== undefined) {
      this.props.cuit = data.cuit;
    }
    if (data.direccion !== undefined) {
      this.props.direccion = data.direccion;
    }
    if (data.ciudad !== undefined) {
      this.props.ciudad = data.ciudad;
    }
    if (data.provincia !== undefined) {
      this.props.provincia = data.provincia;
    }
    if (data.codigoPostal !== undefined) {
      this.props.codigoPostal = data.codigoPostal;
    }
    if (data.telefono !== undefined) {
      this.props.telefono = data.telefono;
    }
    if (data.email !== undefined) {
      this.props.email = data.email;
    }
    if (data.website !== undefined) {
      this.props.website = data.website;
    }
    if (data.logo !== undefined) {
      this.props.logo = data.logo;
    }
    
    this.props.updatedAt = new Date();
  }

  /**
   * Cambia el estado de la empresa
   */
  changeStatus(newStatus: CompanyStatus): void {
    this.props.status = newStatus;
    this.props.updatedAt = new Date();
  }

  /**
   * Activa la empresa
   */
  activate(): void {
    this.changeStatus(CompanyStatus.ACTIVE);
  }

  /**
   * Desactiva la empresa
   */
  deactivate(): void {
    this.changeStatus(CompanyStatus.INACTIVE);
  }

  /**
   * Suspende la empresa
   */
  suspend(): void {
    this.changeStatus(CompanyStatus.SUSPENDED);
  }

  /**
   * Verifica si la empresa está activa
   */
  isActive(): boolean {
    return this.props.status === CompanyStatus.ACTIVE;
  }

  /**
   * Verifica si la empresa está inactiva
   */
  isInactive(): boolean {
    return this.props.status === CompanyStatus.INACTIVE;
  }

  /**
   * Verifica si la empresa está suspendida
   */
  isSuspended(): boolean {
    return this.props.status === CompanyStatus.SUSPENDED;
  }

  /**
   * Retorna las primitivas del objeto
   */
  toPrimitives(): CompanyProps {
    return {
      id: this.props.id,
      razonSocial: this.props.razonSocial,
      nombreFantasia: this.props.nombreFantasia,
      cuit: this.props.cuit,
      direccion: this.props.direccion,
      ciudad: this.props.ciudad,
      provincia: this.props.provincia,
      codigoPostal: this.props.codigoPostal,
      telefono: this.props.telefono,
      email: this.props.email,
      website: this.props.website,
      logo: this.props.logo,
      status: this.props.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get razonSocial(): string {
    return this.props.razonSocial;
  }

  get nombreFantasia(): string {
    return this.props.nombreFantasia;
  }

  get cuit(): string {
    return this.props.cuit;
  }

  get direccion(): string | undefined {
    return this.props.direccion;
  }

  get ciudad(): string | undefined {
    return this.props.ciudad;
  }

  get provincia(): string | undefined {
    return this.props.provincia;
  }

  get codigoPostal(): string | undefined {
    return this.props.codigoPostal;
  }

  get telefono(): string | undefined {
    return this.props.telefono;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  get website(): string | undefined {
    return this.props.website;
  }

  get logo(): string | undefined {
    return this.props.logo;
  }

  get status(): CompanyStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

