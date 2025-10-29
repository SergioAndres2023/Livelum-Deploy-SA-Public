import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { ProcessTypeResponse } from '../dtos/ProcessTypeResponse';

export class FindProcessTypeByIdUseCase {
  constructor(
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(id: string): Promise<ProcessTypeResponse | null> {
    const processType = await this.processTypeRepository.findById(id);
    
    if (!processType) {
      return null;
    }

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
