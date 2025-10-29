import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';
import { ProcessNameResponse } from '../dtos/ProcessNameResponse';

export class GetProcessNamesByTypeUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
  ) {}

  async execute(processTypeId?: string): Promise<ProcessNameResponse[]> {
    let processNames;
    
    if (processTypeId) {
      processNames = await this.processNameRepository.findByTypeId(processTypeId);
    } else {
      processNames = await this.processNameRepository.findAll();
    }

    // Ordenar por order
    processNames.sort((a, b) => a.order - b.order);

    return processNames.map(processName => this.mapToResponse(processName));
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
