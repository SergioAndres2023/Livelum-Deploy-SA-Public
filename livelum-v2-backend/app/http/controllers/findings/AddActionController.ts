import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { AddActionToFindingUseCase } from '@/findings/application/useCases/AddActionToFindingUseCase';
import { FindingDependencyIdentifier } from '@/findings/domain/dependencyIdentifier/FindingDependencyIdentifier';
import { AddActionRequest } from '@/findings/application/dtos/AddActionRequest';

export class AddActionController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: AddActionRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<AddActionToFindingUseCase>(
        FindingDependencyIdentifier.AddActionToFindingUseCase
      );
      const finding = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: finding, message: 'Acción agregada exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
