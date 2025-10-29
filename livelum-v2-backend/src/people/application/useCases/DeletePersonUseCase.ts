import type { PersonRepository } from '../../domain/contracts/PersonRepository';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class DeletePersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.info('Eliminando persona', { id });

    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Persona no encontrada con ID: ${id}`);
    }

    try {
      await this.personRepository.delete(id);

      this.logger.info('Persona eliminada exitosamente', { 
        personId: id,
        username: person.username 
      });
    } catch (error) {
      this.logger.error('Error al eliminar persona', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}
