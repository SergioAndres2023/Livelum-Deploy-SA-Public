import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateEquipmentUseCase } from '@/equipment/application/useCases/CreateEquipmentUseCase';
import { EquipmentDependencyIdentifier } from '@/equipment/domain/dependencyIdentifier/EquipmentDependencyIdentifier';
import { CreateEquipmentRequest } from '@/equipment/application/dtos/CreateEquipmentRequest';

export class CreateEquipmentController {
  static async handle(
    request: FastifyRequest<{ Body: CreateEquipmentRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const useCase = container.resolve<CreateEquipmentUseCase>(
        EquipmentDependencyIdentifier.CreateEquipmentUseCase
      );
      const equipment = await useCase.execute(request.body);
      reply.code(201).send({ success: true, data: equipment, message: 'Equipo creado exitosamente' });
    } catch (error) {
      reply.code(400).send({ success: false, error: (error as Error).message });
    }
  }
}
