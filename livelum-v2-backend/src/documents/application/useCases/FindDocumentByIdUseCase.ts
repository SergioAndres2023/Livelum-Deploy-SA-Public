import { injectable, inject } from 'tsyringe';
import type { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import { DocumentResponse } from '../dtos/DocumentResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class FindDocumentByIdUseCase {
  constructor(
    @inject(DependencyIdentifier.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(id: string): Promise<DocumentResponse | null> {
    try {
      this.logger.info('Finding document by ID', { id });

      const document = await this.documentRepository.findById(id);

      if (!document) {
        this.logger.warn('Document not found', { id });
        return null;
      }

      this.logger.info('Document found successfully', { id, code: document.code });

      return this.mapToResponse(document);
    } catch (error) {
      this.logger.error('Error finding document by ID', { error: (error as Error).message, id });
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
