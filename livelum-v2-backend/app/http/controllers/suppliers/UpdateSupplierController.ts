import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateSupplierUseCase } from '@/suppliers/application/useCases/UpdateSupplierUseCase';
import { SupplierDependencyIdentifier } from '@/suppliers/domain/dependencyIdentifier/SupplierDependencyIdentifier';
import { UpdateSupplierRequest } from '@/suppliers/application/dtos/UpdateSupplierRequest';

export class UpdateSupplierController {
  static async handle(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateSupplierRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<UpdateSupplierUseCase>(
        SupplierDependencyIdentifier.UpdateSupplierUseCase
      );
      const supplier = await useCase.execute(request.params.id, request.body);
      reply.code(200).send({ success: true, data: supplier, message: 'Proveedor actualizado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
