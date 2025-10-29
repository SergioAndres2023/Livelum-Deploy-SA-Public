import { TrainingPlan } from '../../domain/entities/TrainingPlan';
import type { TrainingPlanRepository } from '../../domain/contracts/TrainingPlanRepository';
import { SearchTrainingPlansRequest } from '../dtos/SearchTrainingPlansRequest';
import { TrainingPlanResponse } from '../dtos/TrainingPlanResponse';
import { TrainingPlanSearchCriteriaBuilder } from '../../domain/filters/TrainingPlanSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchTrainingPlansUseCase {
  constructor(
    private readonly trainingPlanRepository: TrainingPlanRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchTrainingPlansRequest): Promise<TrainingPlanResponse[]> {
    this.logger.info('Buscando planes de capacitación', { request });

    const builder = TrainingPlanSearchCriteriaBuilder.create();
    if (request.topic) builder.withTopic(request.topic);
    if (request.type) builder.withType(request.type);
    if (request.status) builder.withStatus(request.status);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.plannedDateFrom && request.plannedDateTo) {
      builder.withPlannedDateRange(request.plannedDateFrom, request.plannedDateTo);
    }
    if (request.overdue) builder.overdueOnly();
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const trainingPlans = await this.trainingPlanRepository.findByCriteria(criteria);

    this.logger.info('Planes de capacitación encontrados', { count: trainingPlans.length });
    return trainingPlans.map(tp => this.mapToResponse(tp));
  }

  private mapToResponse(trainingPlan: TrainingPlan): TrainingPlanResponse {
    const primitives = trainingPlan.toPrimitives();
    return {
      ...primitives,
      isPending: trainingPlan.isPending(),
      isInProgress: trainingPlan.isInProgress(),
      isCompleted: trainingPlan.isCompleted(),
      isOverdue: trainingPlan.isOverdue(),
    };
  }
}
