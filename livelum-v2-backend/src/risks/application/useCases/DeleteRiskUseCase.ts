import type { RiskRepository } from '../../domain/contracts/RiskRepository';

export class DeleteRiskUseCase {
  constructor(
    private readonly riskRepository: RiskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const risk = await this.riskRepository.findById(id);
    
    if (!risk) {
      throw new Error(`Riesgo con ID ${id} no encontrado`);
    }

    try {
      await this.riskRepository.delete(id);
    } catch (error) {
      throw new Error(`Error al eliminar riesgo: ${(error as Error).message}`);
    }
  }
}
