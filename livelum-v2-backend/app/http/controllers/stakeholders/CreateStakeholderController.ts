import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateStakeholderUseCase } from '@/stakeholders/application/useCases/CreateStakeholderUseCase';
import { StakeholderDependencyIdentifier } from '@/stakeholders/domain/dependencyIdentifier/StakeholderDependencyIdentifier';
import { CreateStakeholderRequest } from '@/stakeholders/application/dtos/CreateStakeholderRequest';

export class CreateStakeholderController {
  static async handle(
    request: FastifyRequest<{ Body: CreateStakeholderRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateStakeholderUseCase>(
        StakeholderDependencyIdentifier.CreateStakeholderUseCase
      );
      const stakeholder = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: stakeholder, message: 'Stakeholder creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
