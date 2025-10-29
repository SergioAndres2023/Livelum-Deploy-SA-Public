import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DeleteUserUseCase } from '@/users/application/useCases/DeleteUserUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';

export class DeleteUserController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<DeleteUserUseCase>(
        UserDependencyIdentifier.DeleteUserUseCase
      );

      await useCase.execute(request.params.id);

      reply.code(200).send({
        success: true,
        message: 'Usuario eliminado exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

