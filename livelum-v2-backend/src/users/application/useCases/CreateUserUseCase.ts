import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import type { PasswordHashService } from '../../domain/services/PasswordHashService';
import { CreateUserRequest } from '../dtos/CreateUserRequest';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateUserRequest): Promise<UserResponse> {
    this.logger.info('Creando nuevo usuario', { username: request.username, email: request.email });

    // Verificar si ya existe un usuario con el mismo username
    const existingUsername = await this.userRepository.findByUsername(request.username);
    if (existingUsername) {
      throw new Error(`Ya existe un usuario con el username: ${request.username}`);
    }

    // Verificar si ya existe un usuario con el mismo email
    const existingEmail = await this.userRepository.findByEmail(request.email);
    if (existingEmail) {
      throw new Error(`Ya existe un usuario con el email: ${request.email}`);
    }

    try {
      // Hashear la contraseña
      const hashedPassword = await this.passwordHashService.hash(request.password);

      // Crear la entidad user con la contraseña hasheada
      const user = User.create({
        ...request,
        password: hashedPassword,
      });

      // Guardar en el repositorio
      await this.userRepository.save(user);

      this.logger.info('Usuario creado exitosamente', { 
        userId: user.id, 
        username: user.username 
      });

      return this.mapToResponse(user);
    } catch (error) {
      this.logger.error('Error al crear usuario', { 
        error: (error as Error).message,
        request 
      });
      throw error;
    }
  }

  private mapToResponse(user: User): UserResponse {
    const primitives = user.toPublicPrimitives();
    return {
      id: primitives.id,
      username: primitives.username,
      nombre: primitives.nombre,
      apellido: primitives.apellido,
      fullName: user.getFullName(),
      email: primitives.email,
      telefono: primitives.telefono,
      companyId: primitives.companyId,
      roles: primitives.roles,
      status: primitives.status,
      avatar: primitives.avatar,
      lastLogin: primitives.lastLogin,
      emailVerified: primitives.emailVerified,
      isActive: user.isActive(),
      isInactive: user.isInactive(),
      isPending: user.isPending(),
      isSuspended: user.isSuspended(),
      isAdmin: user.isAdmin(),
      isConsultor: user.isConsultor(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}

