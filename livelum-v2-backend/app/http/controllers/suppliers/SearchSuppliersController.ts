import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchSuppliersUseCase } from '@/suppliers/application/useCases/SearchSuppliersUseCase';
import { SupplierDependencyIdentifier } from '@/suppliers/domain/dependencyIdentifier/SupplierDependencyIdentifier';
import { SearchSuppliersRequest } from '@/suppliers/application/dtos/SearchSuppliersRequest';

export class SearchSuppliersController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchSuppliersRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchSuppliersUseCase>(
        SupplierDependencyIdentifier.SearchSuppliersUseCase
      );
      const suppliers = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: suppliers, total: suppliers.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
