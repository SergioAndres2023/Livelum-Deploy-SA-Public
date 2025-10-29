import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class VerifyEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<UserResponse> {
    this.logger.info('Verificando email de usuario', { id });

    // Buscar el usuario
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuario no encontrado con ID: ${id}`);
    }

    try {
      // Verificar email
      user.verifyEmail();

      // Si el usuario estaba pendiente, activarlo
      if (user.isPending()) {
        user.activate();
      }

      // Guardar cambios
      await this.userRepository.save(user);

      this.logger.info('Email verificado exitosamente', { 
        userId: user.id,
        username: user.username 
      });

      return this.mapToResponse(user);
    } catch (error) {
      this.logger.error('Error al verificar email', { 
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

