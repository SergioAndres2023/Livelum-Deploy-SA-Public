import { Authorization } from '../../domain/entities/Authorization';
import type { AuthorizationRepository } from '../../domain/contracts/AuthorizationRepository';
import { SearchAuthorizationsRequest } from '../dtos/SearchAuthorizationsRequest';
import { AuthorizationResponse } from '../dtos/AuthorizationResponse';
import { AuthorizationSearchCriteriaBuilder } from '../../domain/filters/AuthorizationSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchAuthorizationsUseCase {
  constructor(
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchAuthorizationsRequest): Promise<AuthorizationResponse[]> {
    this.logger.info('Buscando autorizaciones', { request });

    const builder = AuthorizationSearchCriteriaBuilder.create();
    if (request.type) builder.withType(request.type);
    if (request.status) builder.withStatus(request.status);
    if (request.entityId) builder.withEntityId(request.entityId);
    if (request.requestedBy) builder.withRequestedBy(request.requestedBy);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const authorizations = await this.authorizationRepository.findByCriteria(criteria);

    this.logger.info('Autorizaciones encontradas', { count: authorizations.length });
    return authorizations.map(a => this.mapToResponse(a));
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
