import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import type { PasswordHashService } from '../../domain/services/PasswordHashService';
import { ResetPasswordRequest } from '../dtos/ResetPasswordRequest';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly logger: Logger,
  ) {}

  async execute(request: ResetPasswordRequest): Promise<UserResponse> {
    this.logger.info('Reseteo de contraseña con token');

    // Buscar el usuario por el token de reseteo
    const user = await this.userRepository.findByResetToken(request.token);

    if (!user) {
      this.logger.warn('Token de reseteo no válido o expirado');
      throw new Error('Token de reseteo inválido o expirado');
    }

    // Verificar que el token sea válido
    if (!user.isResetTokenValid(request.token)) {
      this.logger.warn('Token expirado', { userId: user.id });
      throw new Error('Token de reseteo expirado');
    }

    try {
      // Hashear la nueva contraseña
      const newHashedPassword = await this.passwordHashService.hash(request.newPassword);

      // Cambiar la contraseña
      user.changePassword(newHashedPassword);

      // Limpiar el token de reseteo
      user.clearResetPasswordToken();

      // Guardar cambios
      await this.userRepository.save(user);

      this.logger.info('Contraseña reseteada exitosamente', { 
        userId: user.id,
        username: user.username 
      });

      return this.mapToResponse(user);
    } catch (error) {
      this.logger.error('Error al resetear contraseña', { 
        error: (error as Error).message 
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

