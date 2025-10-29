import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ChangeUserStatusUseCase } from '@/users/application/useCases/ChangeUserStatusUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { UserStatus } from '@/users/domain/enums/UserEnums';

export class ChangeUserStatusController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: { status: UserStatus } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<ChangeUserStatusUseCase>(
        UserDependencyIdentifier.ChangeUserStatusUseCase
      );

      const user = await useCase.execute(request.params.id, request.body.status);

      reply.code(200).send({
        success: true,
        data: user,
        message: 'Estado de usuario cambiado exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

