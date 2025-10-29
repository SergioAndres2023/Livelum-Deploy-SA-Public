import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';
import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { UpdateProcessNameRequest } from '../dtos/UpdateProcessNameRequest';
import { ProcessNameResponse } from '../dtos/ProcessNameResponse';

export class UpdateProcessNameUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(id: string, request: UpdateProcessNameRequest): Promise<ProcessNameResponse> {
    const processName = await this.processNameRepository.findById(id);
    if (!processName) {
      throw new Error(`Nombre de proceso con ID ${id} no encontrado`);
    }

    // Verificar que el ProcessType existe si se está cambiando
    if (request.processTypeId && request.processTypeId !== processName.processTypeId) {
      const processType = await this.processTypeRepository.findById(request.processTypeId);
      if (!processType) {
        throw new Error(`Tipo de proceso con ID ${request.processTypeId} no encontrado`);
      }
    }

    // Verificar que el orden no esté en uso dentro del mismo ProcessType
    const targetProcessTypeId = request.processTypeId || processName.processTypeId;
    if (request.order !== undefined && request.order !== processName.order) {
      const existingByOrder = await this.processNameRepository.findByTypeIdAndOrder(
        targetProcessTypeId,
        request.order
      );
      if (existingByOrder && existingByOrder.id !== id) {
        throw new Error(`Ya existe un nombre de proceso con el orden ${request.order} en este tipo`);
      }
    }

    // Verificar que el nombre no esté en uso por otro nombre
    if (request.name && request.name !== processName.name) {
      const existingByName = await this.processNameRepository.findByName(request.name);
      if (existingByName && existingByName.id !== id) {
        throw new Error(`Ya existe un nombre de proceso con el nombre "${request.name}"`);
      }
    }

    processName.updateInfo(request);
    await this.processNameRepository.update(processName);

    return this.mapToResponse(processName);
  }

  private mapToResponse(processName: any): ProcessNameResponse {
    const primitives = processName.toPrimitives();
    return {
      id: primitives.id,
      order: primitives.order,
      processTypeId: primitives.processTypeId,
      name: primitives.name,
      createdAt: primitives.createdAt.toISOString(),
      updatedAt: primitives.updatedAt.toISOString(),
    };
  }
}
