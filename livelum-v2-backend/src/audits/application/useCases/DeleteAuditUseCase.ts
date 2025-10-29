import { injectable, inject } from 'tsyringe';
import type { AuditRepository } from '../../domain/contracts/AuditRepository';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class DeleteAuditUseCase {
  constructor(
    @inject(DependencyIdentifier.AuditRepository) private auditRepository: AuditRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      this.logger.info('Deleting audit', { id });

      // Buscar la auditoría existente
      const existingAudit = await this.auditRepository.findById(id);
      if (!existingAudit) {
        throw new Error(`Auditoría con ID ${id} no encontrada`);
      }

      // Realizar soft delete (cancelar)
      existingAudit.cancel();

      // Actualizar en el repositorio
      await this.auditRepository.update(existingAudit);

      this.logger.info('Audit deleted successfully', { id, title: existingAudit.title });
    } catch (error) {
      this.logger.error('Error deleting audit', { error: (error as Error).message, id });
      throw error;
    }
  }
}
