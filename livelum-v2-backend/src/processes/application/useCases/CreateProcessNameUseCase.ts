import { ProcessName } from '../../domain/entities/ProcessName';
import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';
import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { CreateProcessNameRequest } from '../dtos/CreateProcessNameRequest';
import { ProcessNameResponse } from '../dtos/ProcessNameResponse';

export class CreateProcessNameUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(request: CreateProcessNameRequest): Promise<ProcessNameResponse> {
    // Verificar que el ProcessType existe
    const processType = await this.processTypeRepository.findById(request.processTypeId);
    if (!processType) {
      throw new Error(`Tipo de proceso con ID ${request.processTypeId} no encontrado`);
    }

    // Verificar que el orden no esté en uso dentro del mismo ProcessType
    const existingByOrder = await this.processNameRepository.findByTypeIdAndOrder(
      request.processTypeId,
      request.order
    );
    if (existingByOrder) {
      throw new Error(`Ya existe un nombre de proceso con el orden ${request.order} en este tipo`);
    }

    // Verificar que el nombre no esté en uso
    const existingByName = await this.processNameRepository.findByName(request.name);
    if (existingByName) {
      throw new Error(`Ya existe un nombre de proceso con el nombre "${request.name}"`);
    }

    const processName = ProcessName.create(request);
    await this.processNameRepository.save(processName);

    return this.mapToResponse(processName);
  }

  private mapToResponse(processName: ProcessName): ProcessNameResponse {
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
