import { ActionPlan } from '../../domain/entities/ActionPlan';
import type { ActionPlanRepository } from '../../domain/contracts/ActionPlanRepository';
import { CreateActionPlanRequest } from '../dtos/CreateActionPlanRequest';
import { ActionPlanResponse } from '../dtos/ActionPlanResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateActionPlanUseCase {
  constructor(
    private readonly actionPlanRepository: ActionPlanRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateActionPlanRequest): Promise<ActionPlanResponse> {
    this.logger.info('Creando nuevo plan de acción', { origin: request.originDescription });

    try {
      const actionPlan = ActionPlan.create(request);
      await this.actionPlanRepository.save(actionPlan);

      this.logger.info('Plan de acción creado exitosamente', { actionPlanId: actionPlan.id });
      return this.mapToResponse(actionPlan);
    } catch (error) {
      this.logger.error('Error al crear plan de acción', { error: (error as Error).message, request });
      throw error;
    }
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
