import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateTrainingPlanUseCase } from '@/trainingPlans/application/useCases/CreateTrainingPlanUseCase';
import { TrainingPlanDependencyIdentifier } from '@/trainingPlans/domain/dependencyIdentifier/TrainingPlanDependencyIdentifier';
import { CreateTrainingPlanRequest } from '@/trainingPlans/application/dtos/CreateTrainingPlanRequest';

export class CreateTrainingPlanController {
  static async handle(
    request: FastifyRequest<{ Body: CreateTrainingPlanRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateTrainingPlanUseCase>(
        TrainingPlanDependencyIdentifier.CreateTrainingPlanUseCase
      );
      const trainingPlan = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: trainingPlan, message: 'Plan de capacitación creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
