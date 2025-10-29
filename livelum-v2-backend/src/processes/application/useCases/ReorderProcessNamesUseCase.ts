import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';
import { ReorderProcessNamesRequest } from '../dtos/ReorderProcessNamesRequest';

export class ReorderProcessNamesUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
  ) {}

  async execute(request: ReorderProcessNamesRequest): Promise<void> {
    // Verificar que todos los IDs existan
    const allProcessNames = await this.processNameRepository.findAll();
    const existingIds = new Set(allProcessNames.map(pn => pn.id));

    for (const item of request.reorderItems) {
      if (!existingIds.has(item.id)) {
        throw new Error(`Nombre de proceso con ID ${item.id} no encontrado`);
      }
    }

    // Actualizar el orden de cada nombre
    for (const item of request.reorderItems) {
      const processName = await this.processNameRepository.findById(item.id);
      if (processName) {
        processName.updateOrder(item.order);
        await this.processNameRepository.update(processName);
      }
    }
  }
}
