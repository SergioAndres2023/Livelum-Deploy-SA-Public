import { injectable, inject } from 'tsyringe';
import type { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import { DocumentResponse } from '../dtos/DocumentResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class ApproveDocumentUseCase {
  constructor(
    @inject(DependencyIdentifier.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(id: string): Promise<DocumentResponse> {
    try {
      this.logger.info('Approving document', { id });

      // Buscar el documento existente
      const existingDocument = await this.documentRepository.findById(id);
      if (!existingDocument) {
        throw new Error(`Documento con ID ${id} no encontrado`);
      }

      // Aprobar el documento
      existingDocument.approve();

      // Guardar los cambios
      await this.documentRepository.update(existingDocument);

      this.logger.info('Document approved successfully', { id, code: existingDocument.code });

      return this.mapToResponse(existingDocument);
    } catch (error) {
      this.logger.error('Error approving document', { error: (error as Error).message, id });
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
