import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { FindUserByIdUseCase } from '@/users/application/useCases/FindUserByIdUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';

export class FindUserByIdController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<FindUserByIdUseCase>(
        UserDependencyIdentifier.FindUserByIdUseCase
      );

      const user = await useCase.execute(request.params.id);

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

