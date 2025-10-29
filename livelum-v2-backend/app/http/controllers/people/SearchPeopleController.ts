import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchPeopleUseCase } from '@/people/application/useCases/SearchPeopleUseCase';
import { PersonDependencyIdentifier } from '@/people/domain/dependencyIdentifier/PersonDependencyIdentifier';
import { SearchPeopleRequest } from '@/people/application/dtos/SearchPeopleRequest';

export class SearchPeopleController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchPeopleRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchPeopleUseCase>(
        PersonDependencyIdentifier.SearchPeopleUseCase
      );

      const people = await useCase.execute(request.query);

      reply.code(200).send({
        success: true,
        data: people,
        total: people.length,
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
