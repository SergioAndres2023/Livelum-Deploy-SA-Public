import { Objective } from '../../domain/entities/Objective';
import type { ObjectiveRepository } from '../../domain/contracts/ObjectiveRepository';
import { UpdateObjectiveRequest } from '../dtos/UpdateObjectiveRequest';
import { ObjectiveResponse } from '../dtos/ObjectiveResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateObjectiveUseCase {
  constructor(
    private readonly objectiveRepository: ObjectiveRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateObjectiveRequest): Promise<ObjectiveResponse> {
    this.logger.info('Actualizando objetivo', { id, request });

    const objective = await this.objectiveRepository.findById(id);
    if (!objective) {
      throw new Error(`Objetivo no encontrado con ID: ${id}`);
    }

    try {
      objective.update(request);
      await this.objectiveRepository.save(objective);

      this.logger.info('Objetivo actualizado exitosamente', { objectiveId: objective.id });
      return this.mapToResponse(objective);
    } catch (error) {
      this.logger.error('Error al actualizar objetivo', { error: (error as Error).message, id, request });
      throw error;
    }
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
