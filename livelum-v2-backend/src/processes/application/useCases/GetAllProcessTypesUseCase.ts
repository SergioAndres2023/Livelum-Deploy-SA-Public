import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';
import { ProcessTypeResponse } from '../dtos/ProcessTypeResponse';

export class GetAllProcessTypesUseCase {
  constructor(
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(): Promise<ProcessTypeResponse[]> {
    const processTypes = await this.processTypeRepository.findByOrder();
    return processTypes.map(processType => this.mapToResponse(processType));
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
