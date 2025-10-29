import { ClientRepository } from '../../domain/contracts/ClientRepository';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class DeleteClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.info('Eliminando cliente', { clientId: id });

    try {
      // Verificar que el cliente existe
      const existingClient = await this.clientRepository.findById(id);
      if (!existingClient) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
      }

      // Eliminar el cliente (soft delete - cambiar status a INACTIVE)
      existingClient.deactivate();
      await this.clientRepository.update(existingClient);

      this.logger.info('Cliente eliminado exitosamente', { 
        clientId: id, 
        email: existingClient.email 
      });
    } catch (error) {
      this.logger.error('Error al eliminar cliente', { 
        error: (error as Error).message,
        clientId: id 
      });
      throw error;
    }
  }
}
