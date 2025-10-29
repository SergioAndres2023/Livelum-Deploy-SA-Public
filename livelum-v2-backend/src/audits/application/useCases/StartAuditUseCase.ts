import { injectable, inject } from 'tsyringe';
import type { AuditRepository } from '../../domain/contracts/AuditRepository';
import { AuditResponse } from '../dtos/AuditResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class StartAuditUseCase {
  constructor(
    @inject(DependencyIdentifier.AuditRepository) private auditRepository: AuditRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(id: string): Promise<AuditResponse> {
    try {
      this.logger.info('Starting audit', { id });

      // Buscar la auditoría existente
      const existingAudit = await this.auditRepository.findById(id);
      if (!existingAudit) {
        throw new Error(`Auditoría con ID ${id} no encontrada`);
      }

      // Iniciar la auditoría
      existingAudit.start();

      // Guardar los cambios
      await this.auditRepository.update(existingAudit);

      this.logger.info('Audit started successfully', { id, title: existingAudit.title });

      return this.mapToResponse(existingAudit);
    } catch (error) {
      this.logger.error('Error starting audit', { error: (error as Error).message, id });
      throw error;
    }
  }

  private mapToResponse(audit: any): AuditResponse {
    const primitives = audit.toPrimitives();
    return {
      id: primitives.id,
      title: primitives.title,
      auditType: primitives.auditType,
      status: primitives.status,
      plannedDate: primitives.plannedDate,
      actualDate: primitives.actualDate,
      auditorName: primitives.auditorName,
      scope: primitives.scope,
      findings: primitives.findings,
      recommendations: primitives.recommendations,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
      isOverdue: audit.isOverdue(),
      isUpcoming: audit.isUpcoming(),
      daysUntilPlanned: audit.getDaysUntilPlanned(),
      daysOverdue: audit.getDaysOverdue(),
    };
  }
}
