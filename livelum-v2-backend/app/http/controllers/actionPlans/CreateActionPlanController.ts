import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateActionPlanUseCase } from '@/actionPlans/application/useCases/CreateActionPlanUseCase';
import { ActionPlanDependencyIdentifier } from '@/actionPlans/domain/dependencyIdentifier/ActionPlanDependencyIdentifier';
import { CreateActionPlanRequest } from '@/actionPlans/application/dtos/CreateActionPlanRequest';

export class CreateActionPlanController {
  static async handle(
    request: FastifyRequest<{ Body: CreateActionPlanRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateActionPlanUseCase>(
        ActionPlanDependencyIdentifier.CreateActionPlanUseCase
      );
      const actionPlan = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: actionPlan, message: 'Plan de acción creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
