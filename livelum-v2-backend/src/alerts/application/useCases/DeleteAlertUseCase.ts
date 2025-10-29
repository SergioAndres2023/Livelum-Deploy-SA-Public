import type { AlertRepository } from '../../domain/contracts/AlertRepository';

export class DeleteAlertUseCase {
  constructor(
    private readonly alertRepository: AlertRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const alert = await this.alertRepository.findById(id);
    
    if (!alert) {
      throw new Error(`Alerta con ID ${id} no encontrada`);
    }

    try {
      await this.alertRepository.delete(id);
    } catch (error) {
      throw new Error(`Error al eliminar alerta: ${(error as Error).message}`);
    }
  }
}
