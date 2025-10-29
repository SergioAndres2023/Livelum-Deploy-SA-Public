import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';
import { ProcessNameResponse } from '../dtos/ProcessNameResponse';

export class FindProcessNameByIdUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
  ) {}

  async execute(id: string): Promise<ProcessNameResponse | null> {
    const processName = await this.processNameRepository.findById(id);
    
    if (!processName) {
      return null;
    }

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
