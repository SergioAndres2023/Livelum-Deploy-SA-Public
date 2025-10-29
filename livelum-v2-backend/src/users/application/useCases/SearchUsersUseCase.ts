import { User } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/contracts/UserRepository';
import { SearchUsersRequest } from '../dtos/SearchUsersRequest';
import { UserResponse } from '../dtos/UserResponse';
import { UserSearchCriteriaBuilder } from '../../domain/filters/UserSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchUsersRequest): Promise<UserResponse[]> {
    this.logger.info('Buscando usuarios', { request });

    // Construir criterios de búsqueda
    const builder = UserSearchCriteriaBuilder.create();

    if (request.username) {
      builder.withUsername(request.username);
    }

    if (request.nombre) {
      builder.withNombre(request.nombre);
    }

    if (request.apellido) {
      builder.withApellido(request.apellido);
    }

    if (request.email) {
      builder.withEmail(request.email);
    }

    if (request.companyId) {
      builder.withCompanyId(request.companyId);
    }

    if (request.role) {
      builder.withRole(request.role);
    }

    if (request.status) {
      builder.withStatus(request.status);
    }

    if (request.emailVerified !== undefined) {
      if (request.emailVerified) {
        builder.emailVerifiedOnly();
      } else {
        builder.emailNotVerified();
      }
    }

    if (request.page && request.limit) {
      builder.withPagination(request.page, request.limit);
    } else if (request.limit) {
      builder.withLimit(request.limit);
    }

    if (request.sortBy && request.sortOrder) {
      builder.withSorting(request.sortBy, request.sortOrder);
    }

    const criteria = builder.build();

    // Buscar usuarios
    const users = await this.userRepository.findByCriteria(criteria);

    this.logger.info('Usuarios encontrados', { count: users.length });

    return users.map(user => this.mapToResponse(user));
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

