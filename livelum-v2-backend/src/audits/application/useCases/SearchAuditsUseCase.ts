import { injectable, inject } from 'tsyringe';
import type { AuditRepository, AuditSearchCriteria } from '../../domain/contracts/AuditRepository';
import { AuditResponse } from '../dtos/AuditResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class SearchAuditsUseCase {
  constructor(
    @inject(DependencyIdentifier.AuditRepository) private auditRepository: AuditRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(criteria: AuditSearchCriteria): Promise<AuditResponse[]> {
    try {
      this.logger.info('Searching audits', { criteria });

      const audits = await this.auditRepository.findByCriteria(criteria);

      this.logger.info('Audits found', { count: audits.length });

      return audits.map(audit => this.mapToResponse(audit));
    } catch (error) {
      this.logger.error('Error searching audits', { error: (error as Error).message, criteria });
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
