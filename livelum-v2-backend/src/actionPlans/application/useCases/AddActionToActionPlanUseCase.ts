import { ActionPlan } from '../../domain/entities/ActionPlan';
import type { ActionPlanRepository } from '../../domain/contracts/ActionPlanRepository';
import { AddActionToPlanRequest } from '../dtos/AddActionToPlanRequest';
import { ActionPlanResponse } from '../dtos/ActionPlanResponse';
import { PlanAction } from '../../domain/valueObjects/PlanAction';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class AddActionToActionPlanUseCase {
  constructor(
    private readonly actionPlanRepository: ActionPlanRepository,
    private readonly logger: Logger,
  ) {}

  async execute(actionPlanId: string, request: AddActionToPlanRequest): Promise<ActionPlanResponse> {
    this.logger.info('Agregando acción a plan de acción', { actionPlanId, request });

    const actionPlan = await this.actionPlanRepository.findById(actionPlanId);
    if (!actionPlan) {
      throw new Error(`Plan de acción no encontrado con ID: ${actionPlanId}`);
    }

    try {
      const action = PlanAction.create(
        request.description,
        request.responsible,
        request.plannedDate,
        request.comments
      );

      actionPlan.addAction(action);
      await this.actionPlanRepository.save(actionPlan);

      this.logger.info('Acción agregada exitosamente', { actionPlanId, actionId: action.id });
      return this.mapToResponse(actionPlan);
    } catch (error) {
      this.logger.error('Error al agregar acción', { error: (error as Error).message, actionPlanId, request });
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
