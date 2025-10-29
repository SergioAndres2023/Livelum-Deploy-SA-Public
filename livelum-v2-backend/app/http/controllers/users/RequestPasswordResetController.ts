import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RequestPasswordResetUseCase } from '@/users/application/useCases/RequestPasswordResetUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';

export class RequestPasswordResetController {
  static async handle(
    request: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<RequestPasswordResetUseCase>(
        UserDependencyIdentifier.RequestPasswordResetUseCase
      );

      const result = await useCase.execute(request.body.email);

      reply.code(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

