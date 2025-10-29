import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateObjectiveUseCase } from '@/objectives/application/useCases/CreateObjectiveUseCase';
import { ObjectiveDependencyIdentifier } from '@/objectives/domain/dependencyIdentifier/ObjectiveDependencyIdentifier';
import { CreateObjectiveRequest } from '@/objectives/application/dtos/CreateObjectiveRequest';

export class CreateObjectiveController {
  static async handle(
    request: FastifyRequest<{ Body: CreateObjectiveRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateObjectiveUseCase>(
        ObjectiveDependencyIdentifier.CreateObjectiveUseCase
      );
      const objective = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: objective, message: 'Objetivo creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
