import type { UserRepository } from '../../domain/contracts/UserRepository';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.info('Eliminando usuario', { id });

    // Verificar que el usuario exista
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuario no encontrado con ID: ${id}`);
    }

    try {
      await this.userRepository.delete(id);

      this.logger.info('Usuario eliminado exitosamente', { 
        userId: id,
        username: user.username 
      });
    } catch (error) {
      this.logger.error('Error al eliminar usuario', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

