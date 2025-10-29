import { injectable, inject } from 'tsyringe';
import type { AuditRepository } from '../../domain/contracts/AuditRepository';
import { AuditResponse } from '../dtos/AuditResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class FindAuditByIdUseCase {
  constructor(
    @inject(DependencyIdentifier.AuditRepository) private auditRepository: AuditRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(id: string): Promise<AuditResponse | null> {
    try {
      this.logger.info('Finding audit by ID', { id });

      const audit = await this.auditRepository.findById(id);

      if (!audit) {
        this.logger.warn('Audit not found', { id });
        return null;
      }

      this.logger.info('Audit found successfully', { id, title: audit.title });

      return this.mapToResponse(audit);
    } catch (error) {
      this.logger.error('Error finding audit by ID', { error: (error as Error).message, id });
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
