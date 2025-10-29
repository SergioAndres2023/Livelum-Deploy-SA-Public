import { injectable, inject } from 'tsyringe';
import type { AuditRepository } from '../../domain/contracts/AuditRepository';
import { Audit } from '../../domain/entities/Audit';
import { CreateAuditRequest } from '../dtos/CreateAuditRequest';
import { AuditResponse } from '../dtos/AuditResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class CreateAuditUseCase {
  constructor(
    @inject(DependencyIdentifier.AuditRepository) private auditRepository: AuditRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(request: CreateAuditRequest): Promise<AuditResponse> {
    try {
      this.logger.info('Creating audit', { title: request.title, auditType: request.auditType });

      // Crear la entidad Audit
      const audit = Audit.create({
        title: request.title,
        auditType: request.auditType,
        plannedDate: request.plannedDate,
        auditorName: request.auditorName,
        scope: request.scope,
      });

      // Guardar en el repositorio
      await this.auditRepository.save(audit);

      this.logger.info('Audit created successfully', { id: audit.id, title: audit.title });

      return this.mapToResponse(audit);
    } catch (error) {
      this.logger.error('Error creating audit', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(audit: Audit): AuditResponse {
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
