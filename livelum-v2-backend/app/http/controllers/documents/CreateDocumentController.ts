import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { CreateDocumentUseCase } from '../../../../src/documents/application/useCases/CreateDocumentUseCase';
import { CreateDocumentRequest } from '../../../../src/documents/application/dtos/CreateDocumentRequest';
import { DocumentType } from '../../../../src/documents/domain/enums/DocumentEnums';

/**
 * Request body interface for creating a new document
 * @interface CreateDocumentRequestBody
 */
interface CreateDocumentRequestBody {
  /** Document's unique code (e.g., DOC-001, POL-001) */
  code: string;
  /** Document's title */
  title: string;
  /** Document's description (optional) */
  description?: string;
  /** Document type: MANUAL, POLITICA, FORMATO, PROCEDIMIENTO */
  type: DocumentType;
  /** Document's author/creator */
  author: string;
  /** Document's expiration date (optional) */
  expiryDate?: Date;
  /** File URL for S3 storage (optional) */
  fileUrl?: string;
  /** File name (optional) */
  fileName?: string;
  /** File size in bytes (optional) */
  fileSize?: number;
  /** File MIME type (optional) */
  mimeType?: string;
}

/**
 * Controller for handling document creation requests
 * @class CreateDocumentController
 */
export class CreateDocumentController {
  /**
   * Creates a new document
   * @description Creates a new document in the system with the provided information
   * @param {FastifyRequest<{ Body: CreateDocumentRequestBody }>} request - The HTTP request containing document data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * POST /api/documents
   * {
   *   "code": "DOC-001",
   *   "title": "Manual de Procesos Administrativos",
   *   "description": "Manual que describe los procesos administrativos de la empresa",
   *   "type": "MANUAL",
   *   "author": "María García",
   *   "expiryDate": "2024-12-31T00:00:00.000Z"
   * }
   *
   * @throws {400} Bad Request - When validation fails
   * @throws {409} Conflict - When document code already exists
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Body: CreateDocumentRequestBody }>, reply: FastifyReply): Promise<void> {
    try {
      const createDocumentUseCase = container.resolve<CreateDocumentUseCase>(DependencyIdentifier.CreateDocumentUseCase);

      const documentRequest: CreateDocumentRequest = {
        code: request.body.code,
        title: request.body.title,
        description: request.body.description,
        type: request.body.type,
        author: request.body.author,
        expiryDate: request.body.expiryDate,
        fileUrl: request.body.fileUrl,
        fileName: request.body.fileName,
        fileSize: request.body.fileSize,
        mimeType: request.body.mimeType,
      };

      const document = await createDocumentUseCase.execute(documentRequest);

      reply.status(201).send({
        success: true,
        data: document,
        message: 'Documento creado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('Ya existe')) {
        reply.status(409).send({
          success: false,
          error: errorMessage,
          message: 'Conflicto al crear documento',
        });
      } else {
        reply.status(400).send({
          success: false,
          error: errorMessage,
          message: 'Error al crear documento',
        });
      }
    }
  }
}
