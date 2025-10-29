import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { LoginUserUseCase } from '@/users/application/useCases/LoginUserUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { LoginRequest } from '@/users/application/dtos/LoginRequest';

export class LoginUserController {
  static async handle(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<LoginUserUseCase>(
        UserDependencyIdentifier.LoginUserUseCase
      );

      const result = await useCase.execute(request.body);

      reply.code(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      reply.code(401).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

