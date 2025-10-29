import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import { AssignRolesRequest } from '../dtos/AssignRolesRequest';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class AssignRolesUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: AssignRolesRequest): Promise<UserResponse> {
    this.logger.info('Asignando roles a usuario', { id, roles: request.roles });

    // Buscar el usuario
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuario no encontrado con ID: ${id}`);
    }

    try {
      // Asignar roles
      user.assignRoles(request.roles);

      // Guardar cambios
      await this.userRepository.save(user);

      this.logger.info('Roles asignados exitosamente', { 
        userId: user.id,
        username: user.username,
        roles: request.roles 
      });

      return this.mapToResponse(user);
    } catch (error) {
      this.logger.error('Error al asignar roles', { 
        error: (error as Error).message,
        id,
        roles: request.roles 
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

