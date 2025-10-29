import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { ReorderProcessTypesRequest } from '../dtos/ReorderProcessTypesRequest';

export class ReorderProcessTypesUseCase {
  constructor(
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(request: ReorderProcessTypesRequest): Promise<void> {
    // Verificar que todos los IDs existan
    const allProcessTypes = await this.processTypeRepository.findAll();
    const existingIds = new Set(allProcessTypes.map(pt => pt.id));

    for (const item of request.reorderItems) {
      if (!existingIds.has(item.id)) {
        throw new Error(`Tipo de proceso con ID ${item.id} no encontrado`);
      }
    }

    // Actualizar el orden de cada tipo
    for (const item of request.reorderItems) {
      const processType = await this.processTypeRepository.findById(item.id);
      if (processType) {
        processType.updateOrder(item.order);
        await this.processTypeRepository.update(processType);
      }
    }
  }
}
