import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from '@/users/application/useCases/ResetPasswordUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { ResetPasswordRequest } from '@/users/application/dtos/ResetPasswordRequest';

export class ResetPasswordController {
  static async handle(
    request: FastifyRequest<{ Body: ResetPasswordRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<ResetPasswordUseCase>(
        UserDependencyIdentifier.ResetPasswordUseCase
      );

      const user = await useCase.execute(request.body);

      reply.code(200).send({
        success: true,
        data: user,
        message: 'Contraseña reseteada exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

