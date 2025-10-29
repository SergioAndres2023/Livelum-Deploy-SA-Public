import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchMinutesUseCase } from '@/minutes/application/useCases/SearchMinutesUseCase';
import { MinuteDependencyIdentifier } from '@/minutes/domain/dependencyIdentifier/MinuteDependencyIdentifier';
import { SearchMinutesRequest } from '@/minutes/application/dtos/SearchMinutesRequest';

export class SearchMinutesController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchMinutesRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchMinutesUseCase>(
        MinuteDependencyIdentifier.SearchMinutesUseCase
      );
      const minutes = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: minutes, total: minutes.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
