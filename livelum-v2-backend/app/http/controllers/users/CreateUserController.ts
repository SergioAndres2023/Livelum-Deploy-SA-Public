import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '@/users/application/useCases/CreateUserUseCase';
import { UserDependencyIdentifier } from '@/users/domain/dependencyIdentifier/UserDependencyIdentifier';
import { CreateUserRequest } from '@/users/application/dtos/CreateUserRequest';

export class CreateUserController {
  static async handle(
    request: FastifyRequest<{ Body: CreateUserRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateUserUseCase>(
        UserDependencyIdentifier.CreateUserUseCase
      );

      const user = await useCase.execute(request.body);

      reply.code(201).send({
        success: true,
        data: user,
        message: 'Usuario creado exitosamente',
      });
    } catch (error) {
      reply.code(400).send({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}

