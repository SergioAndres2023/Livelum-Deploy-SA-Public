import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { AddCommentUseCase } from '@/objectives/application/useCases/AddCommentUseCase';
import { ObjectiveDependencyIdentifier } from '@/objectives/domain/dependencyIdentifier/ObjectiveDependencyIdentifier';
import { AddCommentRequest } from '@/objectives/application/dtos/AddCommentRequest';

export class AddCommentController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: AddCommentRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<AddCommentUseCase>(
        ObjectiveDependencyIdentifier.AddCommentUseCase
      );
      const objective = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: objective, message: 'Comentario agregado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
