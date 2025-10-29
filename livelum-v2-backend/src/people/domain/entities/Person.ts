import { PersonStatus, ContractType } from '../enums/PersonEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface PersonProps {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  email?: string;
  documento: string;
  telefono?: string;
  companyId: string;
  status: PersonStatus;
  positions: string[];
  contractType?: ContractType;
  hireDate?: Date;
  terminationDate?: Date;
  avatar?: string;
  department?: string;
  supervisor?: string;
  salary?: number;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: string;
  birthDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePersonPrimitives {
  username: string;
  nombre: string;
  apellido: string;
  email?: string;
  documento: string;
  telefono?: string;
  companyId: string;
  positions?: string[];
  contractType?: ContractType;
  hireDate?: Date;
  avatar?: string;
  department?: string;
  supervisor?: string;
  salary?: number;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: string;
  birthDate?: Date;
  notes?: string;
}

export class Person {
  private constructor(private readonly props: PersonProps) {}

  /**
   * Crea una nueva instancia de Person
   */
  static create(primitives: CreatePersonPrimitives): Person {
    const now = new Date();
    
    return new Person({
      id: UniqueEntityID.create().value,
      username: primitives.username,
      nombre: primitives.nombre,
      apellido: primitives.apellido,
      email: primitives.email,
      documento: primitives.documento,
      telefono: primitives.telefono,
      companyId: primitives.companyId,
      status: PersonStatus.ACTIVE,
      positions: primitives.positions || [],
      contractType: primitives.contractType,
      hireDate: primitives.hireDate || now,
      avatar: primitives.avatar,
      department: primitives.department,
      supervisor: primitives.supervisor,
      salary: primitives.salary,
      emergencyContact: primitives.emergencyContact,
      address: primitives.address,
      birthDate: primitives.birthDate,
      notes: primitives.notes,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Reconstruye una instancia de Person desde persistencia
   */
  static fromPrimitives(primitives: PersonProps): Person {
    return new Person(primitives);
  }

  /**
   * Actualiza los datos de la persona
   */
  update(data: Partial<CreatePersonPrimitives>): void {
    if (data.username !== undefined) {
      this.props.username = data.username;
    }
    if (data.nombre !== undefined) {
      this.props.nombre = data.nombre;
    }
    if (data.apellido !== undefined) {
      this.props.apellido = data.apellido;
    }
    if (data.email !== undefined) {
      this.props.email = data.email;
    }
    if (data.documento !== undefined) {
      this.props.documento = data.documento;
    }
    if (data.telefono !== undefined) {
      this.props.telefono = data.telefono;
    }
    if (data.avatar !== undefined) {
      this.props.avatar = data.avatar;
    }
    if (data.department !== undefined) {
      this.props.department = data.department;
    }
    if (data.supervisor !== undefined) {
      this.props.supervisor = data.supervisor;
    }
    if (data.salary !== undefined) {
      this.props.salary = data.salary;
    }
    if (data.emergencyContact !== undefined) {
      this.props.emergencyContact = data.emergencyContact;
    }
    if (data.address !== undefined) {
      this.props.address = data.address;
    }
    if (data.birthDate !== undefined) {
      this.props.birthDate = data.birthDate;
    }
    if (data.notes !== undefined) {
      this.props.notes = data.notes;
    }
    
    this.props.updatedAt = new Date();
  }

  /**
   * Cambia el estado de la persona
   */
  changeStatus(newStatus: PersonStatus): void {
    this.props.status = newStatus;
    
    // Si se termina el contrato, registrar fecha
    if (newStatus === PersonStatus.TERMINATED && !this.props.terminationDate) {
      this.props.terminationDate = new Date();
    }
    
    this.props.updatedAt = new Date();
  }

  /**
   * Activa la persona
   */
  activate(): void {
    this.changeStatus(PersonStatus.ACTIVE);
  }

  /**
   * Desactiva la persona
   */
  deactivate(): void {
    this.changeStatus(PersonStatus.INACTIVE);
  }

  /**
   * Suspende la persona
   */
  suspend(): void {
    this.changeStatus(PersonStatus.SUSPENDED);
  }

  /**
   * Pone en licencia a la persona
   */
  setOnLeave(): void {
    this.changeStatus(PersonStatus.ON_LEAVE);
  }

  /**
   * Termina el contrato de la persona
   */
  terminate(): void {
    this.changeStatus(PersonStatus.TERMINATED);
  }

  /**
   * Asigna puestos a la persona
   */
  assignPositions(positions: string[]): void {
    this.props.positions = positions;
    this.props.updatedAt = new Date();
  }

  /**
   * Agrega un puesto a la persona
   */
  addPosition(position: string): void {
    if (!this.props.positions.includes(position)) {
      this.props.positions.push(position);
      this.props.updatedAt = new Date();
    }
  }

  /**
   * Remueve un puesto de la persona
   */
  removePosition(position: string): void {
    this.props.positions = this.props.positions.filter(p => p !== position);
    this.props.updatedAt = new Date();
  }

  /**
   * Verifica si la persona tiene un puesto específico
   */
  hasPosition(position: string): boolean {
    return this.props.positions.includes(position);
  }

  /**
   * Cambia el tipo de contrato
   */
  changeContractType(contractType: ContractType): void {
    this.props.contractType = contractType;
    this.props.updatedAt = new Date();
  }

  /**
   * Verifica si la persona está activa
   */
  isActive(): boolean {
    return this.props.status === PersonStatus.ACTIVE;
  }

  /**
   * Verifica si la persona está inactiva
   */
  isInactive(): boolean {
    return this.props.status === PersonStatus.INACTIVE;
  }

  /**
   * Verifica si la persona está en licencia
   */
  isOnLeave(): boolean {
    return this.props.status === PersonStatus.ON_LEAVE;
  }

  /**
   * Verifica si la persona está suspendida
   */
  isSuspended(): boolean {
    return this.props.status === PersonStatus.SUSPENDED;
  }

  /**
   * Verifica si la persona está desvinculada
   */
  isTerminated(): boolean {
    return this.props.status === PersonStatus.TERMINATED;
  }

  /**
   * Obtiene el nombre completo de la persona
   */
  getFullName(): string {
    return `${this.props.nombre} ${this.props.apellido}`;
  }

  /**
   * Calcula la antigüedad en años
   */
  getYearsOfService(): number {
    if (!this.props.hireDate) {
      return 0;
    }
    
    const endDate = this.props.terminationDate || new Date();
    const years = endDate.getFullYear() - this.props.hireDate.getFullYear();
    const monthDiff = endDate.getMonth() - this.props.hireDate.getMonth();
    
    return monthDiff < 0 ? years - 1 : years;
  }

  /**
   * Calcula la edad de la persona
   */
  getAge(): number | null {
    if (!this.props.birthDate) {
      return null;
    }
    
    const today = new Date();
    const age = today.getFullYear() - this.props.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.props.birthDate.getMonth();
    
    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.props.birthDate.getDate())
      ? age - 1
      : age;
  }

  /**
   * Retorna las primitivas del objeto
   */
  toPrimitives(): PersonProps {
    return {
      id: this.props.id,
      username: this.props.username,
      nombre: this.props.nombre,
      apellido: this.props.apellido,
      email: this.props.email,
      documento: this.props.documento,
      telefono: this.props.telefono,
      companyId: this.props.companyId,
      status: this.props.status,
      positions: [...this.props.positions],
      contractType: this.props.contractType,
      hireDate: this.props.hireDate,
      terminationDate: this.props.terminationDate,
      avatar: this.props.avatar,
      department: this.props.department,
      supervisor: this.props.supervisor,
      salary: this.props.salary,
      emergencyContact: this.props.emergencyContact 
        ? { ...this.props.emergencyContact }
        : undefined,
      address: this.props.address,
      birthDate: this.props.birthDate,
      notes: this.props.notes,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get username(): string {
    return this.props.username;
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get apellido(): string {
    return this.props.apellido;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  get documento(): string {
    return this.props.documento;
  }

  get telefono(): string | undefined {
    return this.props.telefono;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get status(): PersonStatus {
    return this.props.status;
  }

  get positions(): string[] {
    return [...this.props.positions];
  }

  get contractType(): ContractType | undefined {
    return this.props.contractType;
  }

  get hireDate(): Date | undefined {
    return this.props.hireDate;
  }

  get terminationDate(): Date | undefined {
    return this.props.terminationDate;
  }

  get avatar(): string | undefined {
    return this.props.avatar;
  }

  get department(): string | undefined {
    return this.props.department;
  }

  get supervisor(): string | undefined {
    return this.props.supervisor;
  }

  get salary(): number | undefined {
    return this.props.salary;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

