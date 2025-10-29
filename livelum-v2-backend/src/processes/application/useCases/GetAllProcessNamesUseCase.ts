import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';
import type { ProcessName } from '../../domain/entities/ProcessName';
import { ProcessNameResponse } from '../dtos/ProcessNameResponse';

export class GetAllProcessNamesUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
  ) {}

  async execute(): Promise<ProcessNameResponse[]> {
    console.log('GetAllProcessNamesUseCase: Iniciando...');
    const processNames = await this.processNameRepository.findByOrder();
    console.log('GetAllProcessNamesUseCase: Nombres encontrados:', processNames.length);
    const result = processNames.map((processName: ProcessName) => this.mapToResponse(processName));
    console.log('GetAllProcessNamesUseCase: Resultado mapeado:', result.length);
    return result;
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
