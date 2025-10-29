import { Equipment } from '../../domain/entities/Equipment';
import type { EquipmentRepository } from '../../domain/contracts/EquipmentRepository';
import { CreateEquipmentRequest } from '../dtos/CreateEquipmentRequest';
import { EquipmentResponse } from '../dtos/EquipmentResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateEquipmentUseCase {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateEquipmentRequest): Promise<EquipmentResponse> {
    this.logger.info('Creando nuevo equipo', { name: request.name });

    try {
      const equipmentData = {
        ...request,
        acquisitionDate: request.acquisitionDate ? new Date(request.acquisitionDate) : undefined,
      };

      const equipment = Equipment.create(equipmentData);
      await this.equipmentRepository.save(equipment);

      this.logger.info('Equipo creado exitosamente', { equipmentId: equipment.id });
      return this.mapToResponse(equipment);
    } catch (error) {
      this.logger.error('Error al crear equipo', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(equipment: Equipment): EquipmentResponse {
    const primitives = equipment.toPrimitives();
    return {
      ...primitives,
      isActive: equipment.isActive(),
      isInMaintenance: equipment.isInMaintenance(),
      needsMaintenance: equipment.needsMaintenance(),
    };
  }
}
