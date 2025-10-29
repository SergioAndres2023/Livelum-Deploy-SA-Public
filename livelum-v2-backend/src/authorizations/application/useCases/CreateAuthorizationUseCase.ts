import { Authorization } from '../../domain/entities/Authorization';
import type { AuthorizationRepository } from '../../domain/contracts/AuthorizationRepository';
import { CreateAuthorizationRequest } from '../dtos/CreateAuthorizationRequest';
import { AuthorizationResponse } from '../dtos/AuthorizationResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateAuthorizationUseCase {
  constructor(
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateAuthorizationRequest): Promise<AuthorizationResponse> {
    this.logger.info('Creando nueva autorización', { entityName: request.entityName });

    try {
      const authorization = Authorization.create(request);
      await this.authorizationRepository.save(authorization);

      this.logger.info('Autorización creada exitosamente', { authorizationId: authorization.id });
      return this.mapToResponse(authorization);
    } catch (error) {
      this.logger.error('Error al crear autorización', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(authorization: Authorization): AuthorizationResponse {
    const primitives = authorization.toPrimitives();
    return {
      ...primitives,
      isPending: authorization.isPending(),
      isApproved: authorization.isApproved(),
      isRejected: authorization.isRejected(),
    };
  }
}
