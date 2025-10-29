import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchObjectivesUseCase } from '@/objectives/application/useCases/SearchObjectivesUseCase';
import { ObjectiveDependencyIdentifier } from '@/objectives/domain/dependencyIdentifier/ObjectiveDependencyIdentifier';
import { SearchObjectivesRequest } from '@/objectives/application/dtos/SearchObjectivesRequest';

export class SearchObjectivesController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchObjectivesRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchObjectivesUseCase>(
        ObjectiveDependencyIdentifier.SearchObjectivesUseCase
      );
      const objectives = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: objectives, total: objectives.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
