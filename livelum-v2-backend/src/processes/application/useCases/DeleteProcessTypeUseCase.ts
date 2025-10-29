import type { ProcessTypeRepository } from '../../domain/contracts/ProcessTypeRepository';

export class DeleteProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: ProcessTypeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const processType = await this.processTypeRepository.findById(id);
    if (!processType) {
      throw new Error(`Tipo de proceso con ID ${id} no encontrado`);
    }

    // TODO: Verificar que no haya ProcessNames asociados a este ProcessType
    // const processNamesCount = await this.processNameRepository.countByTypeId(id);
    // if (processNamesCount > 0) {
    //   throw new Error(`No se puede eliminar el tipo de proceso porque tiene ${processNamesCount} nombres asociados`);
    // }

    await this.processTypeRepository.delete(id);
  }
}
