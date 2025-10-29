import { ActionPlan } from '../../domain/entities/ActionPlan';
import type { ActionPlanRepository } from '../../domain/contracts/ActionPlanRepository';
import { SearchActionPlansRequest } from '../dtos/SearchActionPlansRequest';
import { ActionPlanResponse } from '../dtos/ActionPlanResponse';
import { ActionPlanSearchCriteriaBuilder } from '../../domain/filters/ActionPlanSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchActionPlansUseCase {
  constructor(
    private readonly actionPlanRepository: ActionPlanRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchActionPlansRequest): Promise<ActionPlanResponse[]> {
    this.logger.info('Buscando planes de acción', { request });

    const builder = ActionPlanSearchCriteriaBuilder.create();
    if (request.originType) builder.withOriginType(request.originType);
    if (request.originId) builder.withOriginId(request.originId);
    if (request.status) builder.withStatus(request.status);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.createdDateFrom && request.createdDateTo) {
      builder.withCreatedDateRange(request.createdDateFrom, request.createdDateTo);
    }
    if (request.minCompletionPercentage !== undefined && request.maxCompletionPercentage !== undefined) {
      builder.withCompletionRange(request.minCompletionPercentage, request.maxCompletionPercentage);
    }
    if (request.overdueActions) builder.overdueActionsOnly();
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const actionPlans = await this.actionPlanRepository.findByCriteria(criteria);

    this.logger.info('Planes de acción encontrados', { count: actionPlans.length });
    return actionPlans.map(ap => this.mapToResponse(ap));
  }

  private mapToResponse(actionPlan: ActionPlan): ActionPlanResponse {
    const primitives = actionPlan.toPrimitives();
    return {
      ...primitives,
      isPending: actionPlan.isPending(),
      isInProgress: actionPlan.isInProgress(),
      isCompleted: actionPlan.isCompleted(),
      isOverdue: actionPlan.isOverdue(),
      hasOverdueActions: actionPlan.hasOverdueActions(),
      hasOverdueControls: actionPlan.hasOverdueControls(),
    };
  }
}
