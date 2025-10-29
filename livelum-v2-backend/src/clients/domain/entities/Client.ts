import { ClientStatus, ClientType } from '../enums/ClientEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface ClientProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: ClientType;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientPrimitives {
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: ClientType;
}

export class Client {
  private constructor(private props: ClientProps) {}

  static create(primitives: CreateClientPrimitives): Client {
    const now = new Date();
    const id = this.generateId();

    const props: ClientProps = {
      id,
      name: primitives.name.trim(),
      email: primitives.email.toLowerCase().trim(),
      phone: primitives.phone?.trim(),
      nif: primitives.nif?.trim(),
      address: primitives.address?.trim(),
      type: primitives.type,
      status: ClientStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };

    this.validateClient(props);

    return new Client(props);
  }

  static fromPrimitives(props: ClientProps): Client {
    return new Client(props);
  }

  private static generateId(): string {
    return UniqueEntityID.createObjectId().toPrimitive();
  }

  private static validateClient(props: ClientProps): void {
    if (!props.name || props.name.length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    if (!props.email || !this.isValidEmail(props.email)) {
      throw new Error('El email debe ser válido');
    }

    if (props.phone && !this.isValidPhone(props.phone)) {
      throw new Error('El teléfono debe ser válido');
    }

    if (props.nif && !this.isValidNif(props.nif)) {
      throw new Error('El NIF debe ser válido');
    }
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
  }

  private static isValidNif(nif: string): boolean {
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    return nifRegex.test(nif);
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  get nif(): string | undefined {
    return this.props.nif;
  }

  get address(): string | undefined {
    return this.props.address;
  }

  get type(): ClientType {
    return this.props.type;
  }

  get status(): ClientStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  updateInfo(updates: Partial<CreateClientPrimitives>): void {
    if (updates.name) {
      this.props.name = updates.name.trim();
    }
    if (updates.email) {
      this.props.email = updates.email.toLowerCase().trim();
    }
    if (updates.phone !== undefined) {
      this.props.phone = updates.phone?.trim();
    }
    if (updates.nif !== undefined) {
      this.props.nif = updates.nif?.trim();
    }
    if (updates.address !== undefined) {
      this.props.address = updates.address?.trim();
    }
    if (updates.type) {
      this.props.type = updates.type;
    }

    this.props.updatedAt = new Date();
    Client.validateClient(this.props);
  }

  activate(): void {
    this.props.status = ClientStatus.ACTIVE;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = ClientStatus.INACTIVE;
    this.props.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.props.status === ClientStatus.ACTIVE;
  }

  toPrimitives(): ClientProps {
    return { ...this.props };
  }
}
