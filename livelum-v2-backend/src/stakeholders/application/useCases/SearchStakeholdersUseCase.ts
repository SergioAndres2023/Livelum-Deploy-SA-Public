import { Stakeholder } from '../../domain/entities/Stakeholder';
import type { StakeholderRepository } from '../../domain/contracts/StakeholderRepository';
import { SearchStakeholdersRequest } from '../dtos/SearchStakeholdersRequest';
import { StakeholderResponse } from '../dtos/StakeholderResponse';
import { StakeholderSearchCriteriaBuilder } from '../../domain/filters/StakeholderSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchStakeholdersUseCase {
  constructor(
    private readonly stakeholderRepository: StakeholderRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchStakeholdersRequest): Promise<StakeholderResponse[]> {
    this.logger.info('Buscando stakeholders', { request });

    const builder = StakeholderSearchCriteriaBuilder.create();
    if (request.nombre) builder.withNombre(request.nombre);
    if (request.tipo) builder.withTipo(request.tipo);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const stakeholders = await this.stakeholderRepository.findByCriteria(criteria);

    this.logger.info('Stakeholders encontrados', { count: stakeholders.length });
    return stakeholders.map(s => this.mapToResponse(s));
  }

  private mapToResponse(stakeholder: Stakeholder): StakeholderResponse {
    const primitives = stakeholder.toPrimitives();
    return {
      id: primitives.id,
      numero: primitives.numero,
      nombre: primitives.nombre,
      tipo: primitives.tipo,
      requisitos: primitives.requisitos,
      metodoEvaluacion: primitives.metodoEvaluacion,
      companyId: primitives.companyId,
      isInternal: stakeholder.isInternal(),
      isExternal: stakeholder.isExternal(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
