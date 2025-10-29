import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchActionPlansUseCase } from '@/actionPlans/application/useCases/SearchActionPlansUseCase';
import { ActionPlanDependencyIdentifier } from '@/actionPlans/domain/dependencyIdentifier/ActionPlanDependencyIdentifier';
import { SearchActionPlansRequest } from '@/actionPlans/application/dtos/SearchActionPlansRequest';

export class SearchActionPlansController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchActionPlansRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchActionPlansUseCase>(
        ActionPlanDependencyIdentifier.SearchActionPlansUseCase
      );
      const actionPlans = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: actionPlans, total: actionPlans.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
