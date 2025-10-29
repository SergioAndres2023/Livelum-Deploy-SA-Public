import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { FindUserByUsernameUseCase } from '@/users/application/useCases/FindUserByUsernameUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';

export class FindUserByUsernameController {
  static async handle(
    request: FastifyRequest<{ Querystring: { username: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<FindUserByUsernameUseCase>(
        UserDependencyIdentifier.FindUserByUsernameUseCase
      );

      const user = await useCase.execute(request.query.username);

      if (!user) {
        reply.code(404).send({
          success: false,
          error: 'Usuario no encontrado',
        });
        return;
      }

      reply.code(200).send({
        success: true,
        data: user,
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

