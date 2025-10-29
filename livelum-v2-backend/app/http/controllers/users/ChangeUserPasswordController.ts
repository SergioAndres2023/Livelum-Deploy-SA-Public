import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ChangeUserPasswordUseCase } from '@/users/application/useCases/ChangeUserPasswordUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { ChangePasswordRequest } from '@/users/application/dtos/ChangePasswordRequest';

export class ChangeUserPasswordController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: ChangePasswordRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<ChangeUserPasswordUseCase>(
        UserDependencyIdentifier.ChangeUserPasswordUseCase
      );

      const user = await useCase.execute(request.params.id, request.body);

      reply.code(200).send({
        success: true,
        data: user,
        message: 'Contraseña cambiada exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

