import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { VerifyEmailUseCase } from '@/users/application/useCases/VerifyEmailUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';

export class VerifyEmailController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<VerifyEmailUseCase>(
        UserDependencyIdentifier.VerifyEmailUseCase
      );

      const user = await useCase.execute(request.params.id);

      reply.code(200).send({
        success: true,
        data: user,
        message: 'Email verificado exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

