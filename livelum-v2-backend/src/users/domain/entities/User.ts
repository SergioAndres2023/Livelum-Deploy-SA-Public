import { UserRole, UserStatus } from '../enums/UserEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface UserProps {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string; // hashed
  telefono?: string;
  companyId: string;
  roles: UserRole[];
  status: UserStatus;
  avatar?: string;
  lastLogin?: Date;
  emailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserPrimitives {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string; // plain text, será hasheado
  telefono?: string;
  companyId: string;
  roles?: UserRole[];
  avatar?: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  /**
   * Crea una nueva instancia de User
   */
  static create(primitives: CreateUserPrimitives): User {
    const now = new Date();
    
    return new User({
      id: UniqueEntityID.create().value,
      username: primitives.username,
      nombre: primitives.nombre,
      apellido: primitives.apellido,
      email: primitives.email,
      password: primitives.password, // Se hasheará en el use case
      telefono: primitives.telefono,
      companyId: primitives.companyId,
      roles: primitives.roles || [UserRole.VIEWER],
      status: UserStatus.PENDING,
      avatar: primitives.avatar,
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Reconstruye una instancia de User desde persistencia
   */
  static fromPrimitives(primitives: UserProps): User {
    return new User(primitives);
  }

  /**
   * Actualiza los datos del usuario
   */
  update(data: Partial<CreateUserPrimitives>): void {
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
    if (data.telefono !== undefined) {
      this.props.telefono = data.telefono;
    }
    if (data.avatar !== undefined) {
      this.props.avatar = data.avatar;
    }
    
    this.props.updatedAt = new Date();
  }

  /**
   * Cambia la contraseña del usuario
   */
  changePassword(newHashedPassword: string): void {
    this.props.password = newHashedPassword;
    this.props.updatedAt = new Date();
  }

  /**
   * Cambia el estado del usuario
   */
  changeStatus(newStatus: UserStatus): void {
    this.props.status = newStatus;
    this.props.updatedAt = new Date();
  }

  /**
   * Activa el usuario
   */
  activate(): void {
    this.changeStatus(UserStatus.ACTIVE);
  }

  /**
   * Desactiva el usuario
   */
  deactivate(): void {
    this.changeStatus(UserStatus.INACTIVE);
  }

  /**
   * Suspende el usuario
   */
  suspend(): void {
    this.changeStatus(UserStatus.SUSPENDED);
  }

  /**
   * Asigna roles al usuario
   */
  assignRoles(roles: UserRole[]): void {
    this.props.roles = roles;
    this.props.updatedAt = new Date();
  }

  /**
   * Agrega un rol al usuario
   */
  addRole(role: UserRole): void {
    if (!this.props.roles.includes(role)) {
      this.props.roles.push(role);
      this.props.updatedAt = new Date();
    }
  }

  /**
   * Remueve un rol del usuario
   */
  removeRole(role: UserRole): void {
    this.props.roles = this.props.roles.filter(r => r !== role);
    this.props.updatedAt = new Date();
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: UserRole): boolean {
    return this.props.roles.includes(role);
  }

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  /**
   * Verifica si el usuario es consultor
   */
  isConsultor(): boolean {
    return this.hasRole(UserRole.CONSULTOR);
  }

  /**
   * Verifica el email del usuario
   */
  verifyEmail(): void {
    this.props.emailVerified = true;
    this.props.updatedAt = new Date();
  }

  /**
   * Registra el último login
   */
  recordLogin(): void {
    this.props.lastLogin = new Date();
    this.props.updatedAt = new Date();
  }

  /**
   * Genera un token de reseteo de contraseña
   */
  generateResetPasswordToken(token: string, expiresInHours: number = 24): void {
    this.props.resetPasswordToken = token;
    this.props.resetPasswordExpires = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
    this.props.updatedAt = new Date();
  }

  /**
   * Limpia el token de reseteo de contraseña
   */
  clearResetPasswordToken(): void {
    this.props.resetPasswordToken = undefined;
    this.props.resetPasswordExpires = undefined;
    this.props.updatedAt = new Date();
  }

  /**
   * Verifica si el token de reseteo es válido
   */
  isResetTokenValid(token: string): boolean {
    if (!this.props.resetPasswordToken || !this.props.resetPasswordExpires) {
      return false;
    }
    
    return this.props.resetPasswordToken === token && 
           this.props.resetPasswordExpires > new Date();
  }

  /**
   * Verifica si el usuario está activo
   */
  isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }

  /**
   * Verifica si el usuario está inactivo
   */
  isInactive(): boolean {
    return this.props.status === UserStatus.INACTIVE;
  }

  /**
   * Verifica si el usuario está pendiente
   */
  isPending(): boolean {
    return this.props.status === UserStatus.PENDING;
  }

  /**
   * Verifica si el usuario está suspendido
   */
  isSuspended(): boolean {
    return this.props.status === UserStatus.SUSPENDED;
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  getFullName(): string {
    return `${this.props.nombre} ${this.props.apellido}`;
  }

  /**
   * Retorna las primitivas del objeto
   */
  toPrimitives(): UserProps {
    return {
      id: this.props.id,
      username: this.props.username,
      nombre: this.props.nombre,
      apellido: this.props.apellido,
      email: this.props.email,
      password: this.props.password,
      telefono: this.props.telefono,
      companyId: this.props.companyId,
      roles: [...this.props.roles],
      status: this.props.status,
      avatar: this.props.avatar,
      lastLogin: this.props.lastLogin,
      emailVerified: this.props.emailVerified,
      resetPasswordToken: this.props.resetPasswordToken,
      resetPasswordExpires: this.props.resetPasswordExpires,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  /**
   * Retorna las primitivas sin información sensible
   */
  toPublicPrimitives(): Omit<UserProps, 'password' | 'resetPasswordToken' | 'resetPasswordExpires'> {
    const primitives = this.toPrimitives();
    const { password, resetPasswordToken, resetPasswordExpires, ...publicData } = primitives;
    return publicData;
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

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get telefono(): string | undefined {
    return this.props.telefono;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get roles(): UserRole[] {
    return [...this.props.roles];
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get avatar(): string | undefined {
    return this.props.avatar;
  }

  get lastLogin(): Date | undefined {
    return this.props.lastLogin;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

