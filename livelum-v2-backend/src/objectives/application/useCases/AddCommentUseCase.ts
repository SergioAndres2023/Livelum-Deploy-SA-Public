import { Objective } from '../../domain/entities/Objective';
import type { ObjectiveRepository } from '../../domain/contracts/ObjectiveRepository';
import { AddCommentRequest } from '../dtos/AddCommentRequest';
import { ObjectiveResponse } from '../dtos/ObjectiveResponse';
import { ObjectiveComment } from '../../domain/valueObjects/ObjectiveComment';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class AddCommentUseCase {
  constructor(
    private readonly objectiveRepository: ObjectiveRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: AddCommentRequest): Promise<ObjectiveResponse> {
    this.logger.info('Agregando comentario a objetivo', { id, request });

    const objective = await this.objectiveRepository.findById(id);
    if (!objective) {
      throw new Error(`Objetivo no encontrado con ID: ${id}`);
    }

    try {
      const comment = ObjectiveComment.create(
        request.text,
        request.createdBy,
        request.actionRequired || false,
        request.actionDescription,
        request.actionDueDate
      );

      objective.addComment(comment);
      await this.objectiveRepository.save(objective);

      this.logger.info('Comentario agregado exitosamente', { objectiveId: objective.id, commentId: comment.id });
      return this.mapToResponse(objective);
    } catch (error) {
      this.logger.error('Error al agregar comentario', { error: (error as Error).message, id, request });
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
