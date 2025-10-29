import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateAuthorizationUseCase } from '@/authorizations/application/useCases/CreateAuthorizationUseCase';
import { AuthorizationDependencyIdentifier } from '@/authorizations/domain/dependencyIdentifier/AuthorizationDependencyIdentifier';
import { CreateAuthorizationRequest } from '@/authorizations/application/dtos/CreateAuthorizationRequest';

export class CreateAuthorizationController {
  static async handle(
    request: FastifyRequest<{ Body: CreateAuthorizationRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateAuthorizationUseCase>(
        AuthorizationDependencyIdentifier.CreateAuthorizationUseCase
      );
      const authorization = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: authorization, message: 'Autorización creada exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
