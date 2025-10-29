import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchAuthorizationsUseCase } from '@/authorizations/application/useCases/SearchAuthorizationsUseCase';
import { AuthorizationDependencyIdentifier } from '@/authorizations/domain/dependencyIdentifier/AuthorizationDependencyIdentifier';
import { SearchAuthorizationsRequest } from '@/authorizations/application/dtos/SearchAuthorizationsRequest';

export class SearchAuthorizationsController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchAuthorizationsRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchAuthorizationsUseCase>(
        AuthorizationDependencyIdentifier.SearchAuthorizationsUseCase
      );
      const authorizations = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: authorizations, total: authorizations.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
