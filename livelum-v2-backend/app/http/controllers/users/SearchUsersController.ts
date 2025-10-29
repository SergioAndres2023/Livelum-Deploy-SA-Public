import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchUsersUseCase } from '@/users/application/useCases/SearchUsersUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { SearchUsersRequest } from '@/users/application/dtos/SearchUsersRequest';

export class SearchUsersController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchUsersRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchUsersUseCase>(
        UserDependencyIdentifier.SearchUsersUseCase
      );

      const users = await useCase.execute(request.query);

      reply.code(200).send({
        success: true,
        data: users,
        total: users.length,
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

