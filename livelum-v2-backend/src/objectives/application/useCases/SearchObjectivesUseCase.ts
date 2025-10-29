import { Objective } from '../../domain/entities/Objective';
import type { ObjectiveRepository } from '../../domain/contracts/ObjectiveRepository';
import { SearchObjectivesRequest } from '../dtos/SearchObjectivesRequest';
import { ObjectiveResponse } from '../dtos/ObjectiveResponse';
import { ObjectiveSearchCriteriaBuilder } from '../../domain/filters/ObjectiveSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchObjectivesUseCase {
  constructor(
    private readonly objectiveRepository: ObjectiveRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchObjectivesRequest): Promise<ObjectiveResponse[]> {
    this.logger.info('Buscando objetivos', { request });

    const builder = ObjectiveSearchCriteriaBuilder.create();
    if (request.title) builder.withTitle(request.title);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.status) builder.withStatus(request.status);
    if (request.responsibleUserId) builder.withResponsibleUserId(request.responsibleUserId);
    if (request.indicatorId) builder.withIndicatorId(request.indicatorId);
    if (request.overdue) builder.overdueOnly();
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    else if (request.limit) builder.withLimit(request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const objectives = await this.objectiveRepository.findByCriteria(criteria);

    this.logger.info('Objetivos encontrados', { count: objectives.length });
    return objectives.map(obj => this.mapToResponse(obj));
  }

  private mapToResponse(objective: Objective): ObjectiveResponse {
    const primitives = objective.toPrimitives();
    return {
      id: primitives.id,
      title: primitives.title,
      description: primitives.description,
      targetValue: primitives.targetValue,
      currentValue: primitives.currentValue,
      unit: primitives.unit,
      startDate: primitives.startDate,
      targetDate: primitives.targetDate,
      status: primitives.status,
      indicatorId: primitives.indicatorId,
      indicatorName: primitives.indicatorName,
      responsibleUserId: primitives.responsibleUserId,
      responsibleUserName: primitives.responsibleUserName,
      companyId: primitives.companyId,
      comments: primitives.comments,
      progress: objective.getProgress(),
      isActive: objective.isActive(),
      isCompleted: objective.isCompleted(),
      isPaused: objective.isPaused(),
      isCancelled: objective.isCancelled(),
      isOverdue: objective.isOverdue(),
      daysRemaining: objective.getDaysRemaining(),
      hasPendingActions: objective.hasPendingActions(),
      hasOverdueActions: objective.hasOverdueActions(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
