import { injectable, inject } from 'tsyringe';
import type { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import { DocumentResponse } from '../dtos/DocumentResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class FindDocumentByCodeUseCase {
  constructor(
    @inject(DependencyIdentifier.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(code: string): Promise<DocumentResponse | null> {
    try {
      this.logger.info('Finding document by code', { code });

      const document = await this.documentRepository.findByCode(code);

      if (!document) {
        this.logger.warn('Document not found', { code });
        return null;
      }

      this.logger.info('Document found successfully', { id: document.id, code: document.code });

      return this.mapToResponse(document);
    } catch (error) {
      this.logger.error('Error finding document by code', { error: (error as Error).message, code });
      throw error;
    }
  }

  private mapToResponse(document: any): DocumentResponse {
    const primitives = document.toPrimitives();
    return {
      id: primitives.id,
      code: primitives.code,
      title: primitives.title,
      description: primitives.description,
      version: primitives.version,
      type: primitives.type,
      status: primitives.status,
      author: primitives.author,
      createdDate: primitives.createdDate,
      expiryDate: primitives.expiryDate,
      fileUrl: primitives.fileUrl,
      fileName: primitives.fileName,
      fileSize: primitives.fileSize,
      mimeType: primitives.mimeType,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
      isExpired: document.isExpired(),
      isExpiringSoon: document.isExpiringSoon(),
    };
  }
}
