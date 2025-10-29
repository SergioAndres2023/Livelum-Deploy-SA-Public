import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import { UserResponse } from '../dtos/UserResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class FindUserByUsernameUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(username: string): Promise<UserResponse | null> {
    this.logger.info('Buscando usuario por username', { username });

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      this.logger.warn('Usuario no encontrado', { username });
      return null;
    }

    this.logger.info('Usuario encontrado', { username, userId: user.id });
    return this.mapToResponse(user);
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

