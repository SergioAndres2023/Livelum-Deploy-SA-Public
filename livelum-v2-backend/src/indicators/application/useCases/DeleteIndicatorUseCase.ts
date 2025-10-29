import type { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';

export class DeleteIndicatorUseCase {
  constructor(
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const indicator = await this.indicatorRepository.findById(id);
    
    if (!indicator) {
      throw new Error(`Indicador con ID ${id} no encontrado`);
    }

    try {
      await this.indicatorRepository.delete(id);
    } catch (error) {
      throw new Error(`Error al eliminar indicador: ${(error as Error).message}`);
    }
  }
}
