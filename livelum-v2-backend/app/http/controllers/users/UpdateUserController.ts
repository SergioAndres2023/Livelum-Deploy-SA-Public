import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from '@/users/application/useCases/UpdateUserUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { UpdateUserRequest } from '@/users/application/dtos/UpdateUserRequest';

export class UpdateUserController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdateUserUseCase>(
        UserDependencyIdentifier.UpdateUserUseCase
      );

      const user = await useCase.execute(request.params.id, request.body);

      reply.code(200).send({
        success: true,
        data: user,
        message: 'Usuario actualizado exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

