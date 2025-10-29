import { injectable, inject } from 'tsyringe';
import type { DocumentRepository } from '../../domain/contracts/DocumentRepository';
import { Document } from '../../domain/entities/Document';
import { CreateDocumentRequest } from '../dtos/CreateDocumentRequest';
import { DocumentResponse } from '../dtos/DocumentResponse';
import type { Logger } from '../../../cross-cutting/infrastructure/logger/Logger';
import { DependencyIdentifier } from '../../../cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';

@injectable()
export class CreateDocumentUseCase {
  constructor(
    @inject(DependencyIdentifier.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(DependencyIdentifier.Logger) private logger: Logger,
  ) {}

  async execute(request: CreateDocumentRequest): Promise<DocumentResponse> {
    try {
      this.logger.info('Creating document', { code: request.code, title: request.title });

      // Verificar que el código no exista
      const existingDocument = await this.documentRepository.findByCode(request.code);
      if (existingDocument) {
        throw new Error(`Ya existe un documento con el código: ${request.code}`);
      }

      // Crear la entidad Document
      const document = Document.create({
        code: request.code,
        title: request.title,
        description: request.description,
        type: request.type,
        author: request.author,
        expiryDate: request.expiryDate,
        fileUrl: request.fileUrl,
        fileName: request.fileName,
        fileSize: request.fileSize,
        mimeType: request.mimeType,
      });

      // Guardar en el repositorio
      await this.documentRepository.save(document);

      this.logger.info('Document created successfully', { id: document.id, code: document.code });

      return this.mapToResponse(document);
    } catch (error) {
      this.logger.error('Error creating document', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(document: Document): DocumentResponse {
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
