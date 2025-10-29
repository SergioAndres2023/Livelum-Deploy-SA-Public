import { Objective } from '../../domain/entities/Objective';
import type { ObjectiveRepository } from '../../domain/contracts/ObjectiveRepository';
import { CreateObjectiveRequest } from '../dtos/CreateObjectiveRequest';
import { ObjectiveResponse } from '../dtos/ObjectiveResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateObjectiveUseCase {
  constructor(
    private readonly objectiveRepository: ObjectiveRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateObjectiveRequest): Promise<ObjectiveResponse> {
    this.logger.info('Creando nuevo objetivo', { title: request.title });

    try {
      const objective = Objective.create(request);
      await this.objectiveRepository.save(objective);

      this.logger.info('Objetivo creado exitosamente', { objectiveId: objective.id });
      return this.mapToResponse(objective);
    } catch (error) {
      this.logger.error('Error al crear objetivo', { error: (error as Error).message, request });
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
