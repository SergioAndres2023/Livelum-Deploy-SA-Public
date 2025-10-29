import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateSupplierUseCase } from '@/suppliers/application/useCases/CreateSupplierUseCase';
import { SupplierDependencyIdentifier } from '@/suppliers/domain/dependencyIdentifier/SupplierDependencyIdentifier';
import { CreateSupplierRequest } from '@/suppliers/application/dtos/CreateSupplierRequest';

export class CreateSupplierController {
  static async handle(
    request: FastifyRequest<{ Body: CreateSupplierRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateSupplierUseCase>(
        SupplierDependencyIdentifier.CreateSupplierUseCase
      );
      const supplier = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: supplier, message: 'Proveedor creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
