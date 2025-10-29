import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateObjectiveUseCase } from '@/objectives/application/useCases/UpdateObjectiveUseCase';
import { ObjectiveDependencyIdentifier } from '@/objectives/domain/dependencyIdentifier/ObjectiveDependencyIdentifier';
import { UpdateObjectiveRequest } from '@/objectives/application/dtos/UpdateObjectiveRequest';

export class UpdateObjectiveController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateObjectiveRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdateObjectiveUseCase>(
        ObjectiveDependencyIdentifier.UpdateObjectiveUseCase
      );
      const objective = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: objective, message: 'Objetivo actualizado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
