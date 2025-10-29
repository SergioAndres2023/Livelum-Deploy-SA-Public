import type { ProcessNameRepository } from '../../domain/contracts/ProcessNameRepository';

export class DeleteProcessNameUseCase {
  constructor(
    private readonly processNameRepository: ProcessNameRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const processName = await this.processNameRepository.findById(id);
    if (!processName) {
      throw new Error(`Nombre de proceso con ID ${id} no encontrado`);
    }

    // TODO: Verificar que no haya ProcessSheets asociados a este ProcessName
    // const processSheetsCount = await this.processSheetRepository.countByProcessNameId(id);
    // if (processSheetsCount > 0) {
    //   throw new Error(`No se puede eliminar el nombre de proceso porque tiene ${processSheetsCount} fichas asociadas`);
    // }

    await this.processNameRepository.delete(id);
  }
}
