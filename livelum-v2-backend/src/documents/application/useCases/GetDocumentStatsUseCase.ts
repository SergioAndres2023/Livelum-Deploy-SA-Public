import { injectable, inject } from 'tsyringe';
import type { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import { DocumentStatsResponse } from '../dtos/DocumentResponse';
import { DocumentStatus, DocumentType } from '../../domain/enums/DocumentEnums';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class GetDocumentStatsUseCase {
  constructor(
    @inject(DependencyIdentifier.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(): Promise<DocumentStatsResponse> {
    try {
      this.logger.info('Getting document statistics');

      // Obtener conteos por estado
      const [total, inReview, approved, expired] = await Promise.all([
        this.documentRepository.countTotal(),
        this.documentRepository.countByStatus(DocumentStatus.EN_REVISION),
        this.documentRepository.countByStatus(DocumentStatus.APROBADO),
        this.documentRepository.countByStatus(DocumentStatus.VENCIDO),
      ]);

      // Obtener documentos que están por vencer
      const expiringSoon = await this.documentRepository.findExpiringSoon(30);
      const expiringSoonCount = expiringSoon.length;

      // Obtener conteos por tipo
      const byType = await this.getCountsByType();

      const stats: DocumentStatsResponse = {
        total,
        inReview,
        approved,
        expiringSoon: expiringSoonCount,
        expired,
        byType,
      };

      this.logger.info('Document statistics retrieved successfully', { stats });

      return stats;
    } catch (error) {
      this.logger.error('Error getting document statistics', { error: (error as Error).message });
      throw error;
    }
  }

  private async getCountsByType(): Promise<{ [key in DocumentType]: number }> {
    const [manual, politica, formato, procedimiento] = await Promise.all([
      this.documentRepository.findByCriteria({ type: DocumentType.MANUAL }),
      this.documentRepository.findByCriteria({ type: DocumentType.POLITICA }),
      this.documentRepository.findByCriteria({ type: DocumentType.FORMATO }),
      this.documentRepository.findByCriteria({ type: DocumentType.PROCEDIMIENTO }),
    ]);

    return {
      [DocumentType.MANUAL]: manual.length,
      [DocumentType.POLITICA]: politica.length,
      [DocumentType.FORMATO]: formato.length,
      [DocumentType.PROCEDIMIENTO]: procedimiento.length,
    };
  }
}
