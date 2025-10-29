import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateStakeholderUseCase } from '@/stakeholders/application/useCases/UpdateStakeholderUseCase';
import { StakeholderDependencyIdentifier } from '@/stakeholders/domain/dependencyIdentifier/StakeholderDependencyIdentifier';
import { UpdateStakeholderRequest } from '@/stakeholders/application/dtos/UpdateStakeholderRequest';

export class UpdateStakeholderController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateStakeholderRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdateStakeholderUseCase>(
        StakeholderDependencyIdentifier.UpdateStakeholderUseCase
      );
      const stakeholder = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: stakeholder, message: 'Stakeholder actualizado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
