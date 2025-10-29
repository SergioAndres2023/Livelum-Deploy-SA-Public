import { ProcessType } from '../../domain/entities/ProcessType';
import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { CreateProcessTypeRequest } from '../dtos/CreateProcessTypeRequest';
import { ProcessTypeResponse } from '../dtos/ProcessTypeResponse';

export class CreateProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(request: CreateProcessTypeRequest): Promise<ProcessTypeResponse> {
    // Verificar que el orden no esté en uso
    const existingByOrder = await this.processTypeRepository.findByOrderValue(request.order);
    if (existingByOrder) {
      throw new Error(`Ya existe un tipo de proceso con el orden ${request.order}`);
    }

    // Verificar que el nombre no esté en uso
    const existingByName = await this.processTypeRepository.findByName(request.name);
    if (existingByName) {
      throw new Error(`Ya existe un tipo de proceso con el nombre "${request.name}"`);
    }

    const processType = ProcessType.create(request);
    await this.processTypeRepository.save(processType);

    return this.mapToResponse(processType);
  }

  private mapToResponse(processType: ProcessType): ProcessTypeResponse {
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
