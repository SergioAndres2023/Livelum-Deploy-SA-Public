import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateFindingUseCase } from '@/findings/application/useCases/UpdateFindingUseCase';
import { FindingDependencyIdentifier } from '@/findings/domain/dependencyIdentifier/FindingDependencyIdentifier';
import { UpdateFindingRequest } from '@/findings/application/dtos/UpdateFindingRequest';

export class UpdateFindingController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateFindingRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdateFindingUseCase>(
        FindingDependencyIdentifier.UpdateFindingUseCase
      );
      const finding = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: finding, message: 'Hallazgo actualizado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
