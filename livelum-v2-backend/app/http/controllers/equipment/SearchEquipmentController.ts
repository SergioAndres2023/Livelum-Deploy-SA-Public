import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchEquipmentUseCase } from '@/equipment/application/useCases/SearchEquipmentUseCase';
import { EquipmentDependencyIdentifier } from '@/equipment/domain/dependencyIdentifier/EquipmentDependencyIdentifier';
import { SearchEquipmentRequest } from '@/equipment/application/dtos/SearchEquipmentRequest';

export class SearchEquipmentController {
  static async handle(
    request: FastifyRequest<{ Querystring: SearchEquipmentRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<SearchEquipmentUseCase>(
        EquipmentDependencyIdentifier.SearchEquipmentUseCase
      );
      const equipment = await useCase.execute(request.query);
      reply.code(200).send({ success: true, data: equipment, total: equipment.length });
    } catch (error) {
      reply.code(500).send({ success: false, error: (error as Error).message });
    }
  }
}
