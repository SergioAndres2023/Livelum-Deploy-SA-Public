import { TrainingPlan } from '../../domain/entities/TrainingPlan';
import type { TrainingPlanRepository } from '../../domain/contracts/TrainingPlanRepository';
import { CreateTrainingPlanRequest } from '../dtos/CreateTrainingPlanRequest';
import { TrainingPlanResponse } from '../dtos/TrainingPlanResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateTrainingPlanUseCase {
  constructor(
    private readonly trainingPlanRepository: TrainingPlanRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateTrainingPlanRequest): Promise<TrainingPlanResponse> {
    this.logger.info('Creando nuevo plan de capacitación', { topic: request.topic });

    try {
      const trainingPlan = TrainingPlan.create(request);
      await this.trainingPlanRepository.save(trainingPlan);

      this.logger.info('Plan de capacitación creado exitosamente', { trainingPlanId: trainingPlan.id });
      return this.mapToResponse(trainingPlan);
    } catch (error) {
      this.logger.error('Error al crear plan de capacitación', { error: (error as Error).message, request });
      throw error;
    }
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
