import { injectable, inject } from 'tsyringe';
import type { AuditRepository } from '../../domain/contracts/AuditRepository';
import { AuditStatsResponse } from '../dtos/AuditResponse';
import { AuditStatus, AuditType } from '../../domain/enums/AuditEnums';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class GetAuditStatsUseCase {
  constructor(
    @inject(DependencyIdentifier.AuditRepository) private auditRepository: AuditRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(): Promise<AuditStatsResponse> {
    try {
      this.logger.info('Getting audit statistics');

      // Obtener conteos por estado
      const [total, planned, inProgress, completed, cancelled] = await Promise.all([
        this.auditRepository.countTotal(),
        this.auditRepository.countByStatus(AuditStatus.PLANNED),
        this.auditRepository.countByStatus(AuditStatus.IN_PROGRESS),
        this.auditRepository.countByStatus(AuditStatus.COMPLETED),
        this.auditRepository.countByStatus(AuditStatus.CANCELLED),
      ]);

      // Obtener auditorías vencidas y próximas
      const [overdue, upcoming] = await Promise.all([
        this.auditRepository.findOverdue(),
        this.auditRepository.findUpcoming(7),
      ]);

      // Obtener conteos por tipo
      const byType = await this.getCountsByType();

      const stats: AuditStatsResponse = {
        total,
        planned,
        inProgress,
        completed,
        cancelled,
        overdue: overdue.length,
        upcoming: upcoming.length,
        byType,
      };

      this.logger.info('Audit statistics retrieved successfully', { stats });

      return stats;
    } catch (error) {
      this.logger.error('Error getting audit statistics', { error: (error as Error).message });
      throw error;
    }
  }

  private async getCountsByType(): Promise<{ [key in AuditType]: number }> {
    const [internal, external] = await Promise.all([
      this.auditRepository.countByType(AuditType.INTERNAL),
      this.auditRepository.countByType(AuditType.EXTERNAL),
    ]);

    return {
      [AuditType.INTERNAL]: internal,
      [AuditType.EXTERNAL]: external,
    };
  }
}
