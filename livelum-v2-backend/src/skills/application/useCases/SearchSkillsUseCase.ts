import { Skill } from '../../domain/entities/Skill';
import type { SkillRepository } from '../../domain/contracts/SkillRepository';
import { SearchSkillsRequest } from '../dtos/SearchSkillsRequest';
import { SkillResponse } from '../dtos/SkillResponse';
import { SkillSearchCriteriaBuilder } from '../../domain/filters/SkillSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchSkillsUseCase {
  constructor(
    private readonly skillRepository: SkillRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchSkillsRequest): Promise<SkillResponse[]> {
    this.logger.info('Buscando competencias', { request });

    const builder = SkillSearchCriteriaBuilder.create();
    if (request.title) builder.withTitle(request.title);
    if (request.category) builder.withCategory(request.category);
    if (request.status) builder.withStatus(request.status);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const skills = await this.skillRepository.findByCriteria(criteria);

    this.logger.info('Competencias encontradas', { count: skills.length });
    return skills.map(s => this.mapToResponse(s));
  }

  private mapToResponse(skill: Skill): SkillResponse {
    const primitives = skill.toPrimitives();
    return {
      ...primitives,
      isActive: skill.isActive(),
    };
  }
}
