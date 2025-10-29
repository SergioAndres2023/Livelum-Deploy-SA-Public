import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateSupplierEvaluationUseCase } from '@/suppliers/application/useCases/UpdateSupplierEvaluationUseCase';
import { SupplierDependencyIdentifier } from '@/suppliers/domain/dependencyIdentifier/SupplierDependencyIdentifier';
import { UpdateSupplierEvaluationRequest } from '@/suppliers/application/dtos/UpdateSupplierEvaluationRequest';

export class UpdateSupplierEvaluationController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateSupplierEvaluationRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdateSupplierEvaluationUseCase>(
        SupplierDependencyIdentifier.UpdateSupplierEvaluationUseCase
      );
      const supplier = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: supplier, message: 'Evaluación actualizada exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
