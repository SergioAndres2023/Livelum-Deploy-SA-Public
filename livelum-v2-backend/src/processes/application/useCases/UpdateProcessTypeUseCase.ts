import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { UpdateProcessTypeRequest } from '../dtos/UpdateProcessTypeRequest';
import { ProcessTypeResponse } from '../dtos/ProcessTypeResponse';

export class UpdateProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(id: string, request: UpdateProcessTypeRequest): Promise<ProcessTypeResponse> {
    const processType = await this.processTypeRepository.findById(id);
    if (!processType) {
      throw new Error(`Tipo de proceso con ID ${id} no encontrado`);
    }

    // Verificar que el orden no esté en uso por otro tipo
    if (request.order !== undefined && request.order !== processType.order) {
      const existingByOrder = await this.processTypeRepository.findByOrderValue(request.order);
      if (existingByOrder && existingByOrder.id !== id) {
        throw new Error(`Ya existe un tipo de proceso con el orden ${request.order}`);
      }
    }

    // Verificar que el nombre no esté en uso por otro tipo
    if (request.name && request.name !== processType.name) {
      const existingByName = await this.processTypeRepository.findByName(request.name);
      if (existingByName && existingByName.id !== id) {
        throw new Error(`Ya existe un tipo de proceso con el nombre "${request.name}"`);
      }
    }

    processType.updateInfo(request);
    await this.processTypeRepository.update(processType);

    return this.mapToResponse(processType);
  }

  private mapToResponse(processType: any): ProcessTypeResponse {
    const primitives = processType.toPrimitives();
    return {
      id: primitives.id,
      order: primitives.order,
      name: primitives.name,
      links: primitives.links,
      createdAt: primitives.createdAt.toISOString(),
      updatedAt: primitives.updatedAt.toISOString(),
    };
  }
}
