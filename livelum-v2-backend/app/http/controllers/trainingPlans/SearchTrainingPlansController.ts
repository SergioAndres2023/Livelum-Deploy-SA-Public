import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchTrainingPlansUseCase } from '@/trainingPlans/application/useCases/SearchTrainingPlansUseCase';
import { TrainingPlanDependencyIdentifier } from '@/trainingPlans/domain/dependencyIdentifier/TrainingPlanDependencyIdentifier';
import { SearchTrainingPlansRequest } from '@/trainingPlans/application/dtos/SearchTrainingPlansRequest';

export class SearchTrainingPlansController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchTrainingPlansRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchTrainingPlansUseCase>(
        TrainingPlanDependencyIdentifier.SearchTrainingPlansUseCase
      );
      const trainingPlans = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: trainingPlans, total: trainingPlans.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
