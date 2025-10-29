import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { AddActionToActionPlanUseCase } from '@/actionPlans/application/useCases/AddActionToActionPlanUseCase';
import { ActionPlanDependencyIdentifier } from '@/actionPlans/domain/dependencyIdentifier/ActionPlanDependencyIdentifier';
import { AddActionToPlanRequest } from '@/actionPlans/application/dtos/AddActionToPlanRequest';

export class AddActionToPlanController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: AddActionToPlanRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<AddActionToActionPlanUseCase>(
        ActionPlanDependencyIdentifier.AddActionToActionPlanUseCase
      );
      const actionPlan = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: actionPlan, message: 'Acción agregada exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
