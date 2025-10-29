import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import type { PasswordHashService } from '../../domain/services/PasswordHashService';
import { LoginRequest } from '../dtos/LoginRequest';
import { LoginResponse } from '../dtos/LoginResponse';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly logger: Logger,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    this.logger.info('Intentando login', { username: request.username });

    // Buscar usuario por username
    const user = await this.userRepository.findByUsername(request.username);
    
    if (!user) {
      this.logger.warn('Usuario no encontrado', { username: request.username });
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Verificar la contraseña
    const isPasswordValid = await this.passwordHashService.compare(
      request.password,
      user.password
    );

    if (!isPasswordValid) {
      this.logger.warn('Contraseña incorrecta', { username: request.username });
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Verificar que el usuario esté activo
    if (!user.isActive()) {
      this.logger.warn('Usuario no activo', { 
        username: request.username,
        status: user.status 
      });
      throw new Error('Usuario no activo. Contacte al administrador.');
    }

    try {
      // Registrar el login
      user.recordLogin();
      await this.userRepository.save(user);

      this.logger.info('Login exitoso', { 
        userId: user.id,
        username: user.username 
      });

      return {
        user: this.mapToResponse(user),
        message: 'Login exitoso',
      };
    } catch (error) {
      this.logger.error('Error al procesar login', { 
        error: (error as Error).message,
        username: request.username 
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

