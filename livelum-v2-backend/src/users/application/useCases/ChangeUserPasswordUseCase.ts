import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import type { PasswordHashService } from '../../domain/services/PasswordHashService';
import { ChangePasswordRequest } from '../dtos/ChangePasswordRequest';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ChangeUserPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: ChangePasswordRequest): Promise<UserResponse> {
    this.logger.info('Cambiando contraseña de usuario', { id });

    // Buscar el usuario
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuario no encontrado con ID: ${id}`);
    }

    // Verificar la contraseña actual
    const isCurrentPasswordValid = await this.passwordHashService.compare(
      request.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      this.logger.warn('Contraseña actual incorrecta', { id });
      throw new Error('La contraseña actual es incorrecta');
    }

    try {
      // Hashear la nueva contraseña
      const newHashedPassword = await this.passwordHashService.hash(request.newPassword);

      // Cambiar la contraseña
      user.changePassword(newHashedPassword);

      // Guardar cambios
      await this.userRepository.save(user);

      this.logger.info('Contraseña cambiada exitosamente', { 
        userId: user.id,
        username: user.username 
      });

      return this.mapToResponse(user);
    } catch (error) {
      this.logger.error('Error al cambiar contraseña', { 
        error: (error as Error).message,
        id 
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

