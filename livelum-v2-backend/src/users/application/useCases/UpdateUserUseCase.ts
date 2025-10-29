import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import { UpdateUserRequest } from '../dtos/UpdateUserRequest';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateUserRequest): Promise<UserResponse> {
    this.logger.info('Actualizando usuario', { id, request });

    // Buscar el usuario
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuario no encontrado con ID: ${id}`);
    }

    // Si se está actualizando el username, verificar que no exista otro usuario con ese username
    if (request.username && request.username !== user.username) {
      const existingUser = await this.userRepository.findByUsername(request.username);
      if (existingUser && existingUser.id !== id) {
        throw new Error(`Ya existe otro usuario con el username: ${request.username}`);
      }
    }

    // Si se está actualizando el email, verificar que no exista otro usuario con ese email
    if (request.email && request.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(request.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error(`Ya existe otro usuario con el email: ${request.email}`);
      }
    }

    try {
      // Actualizar la entidad
      user.update(request);

      // Guardar cambios
      await this.userRepository.save(user);

      this.logger.info('Usuario actualizado exitosamente', { 
        userId: user.id,
        username: user.username 
      });

      return this.mapToResponse(user);
    } catch (error) {
      this.logger.error('Error al actualizar usuario', { 
        error: (error as Error).message,
        id,
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

