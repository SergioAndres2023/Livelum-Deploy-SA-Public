import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { UpdateDocumentUseCase } from '../../../../src/documents/application/useCases/UpdateDocumentUseCase';
import { UpdateDocumentRequest } from '../../../../src/documents/application/dtos/UpdateDocumentRequest';
import { DocumentType } from '../../../../src/documents/domain/enums/DocumentEnums';

/**
 * Request parameters interface for updating a document
 * @interface UpdateDocumentParams
 */
interface UpdateDocumentParams {
  /** Document's unique identifier */
  id: string;
}

/**
 * Request body interface for updating a document
 * @interface UpdateDocumentRequestBody
 */
interface UpdateDocumentRequestBody {
  /** Document's unique code (optional) */
  code?: string;
  /** Document's title (optional) */
  title?: string;
  /** Document's description (optional) */
  description?: string;
  /** Document type (optional) */
  type?: DocumentType;
  /** Document's author (optional) */
  author?: string;
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
 * Controller for handling document update requests
 * @class UpdateDocumentController
 */
export class UpdateDocumentController {
  /**
   * Updates an existing document
   * @description Updates an existing document's information with the provided data
   * @param {FastifyRequest<{ Params: UpdateDocumentParams; Body: UpdateDocumentRequestBody }>} request - The HTTP request containing document ID and update data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * PUT /api/documents/507f1f77bcf86cd799439011
   * {
   *   "title": "Manual de Procesos Administrativos Actualizado",
   *   "description": "Descripción actualizada del manual",
   *   "expiryDate": "2025-12-31T00:00:00.000Z"
   * }
   *
   * @throws {404} Not Found - When document with the given ID doesn't exist
   * @throws {409} Conflict - When document code already exists for another document
   * @throws {400} Bad Request - When validation fails
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{
      Params: UpdateDocumentParams;
      Body: UpdateDocumentRequestBody
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const updateDocumentUseCase = container.resolve<UpdateDocumentUseCase>(DependencyIdentifier.UpdateDocumentUseCase);

      const updateRequest: UpdateDocumentRequest = {
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

      const document = await updateDocumentUseCase.execute(request.params.id, updateRequest);

      reply.status(200).send({
        success: true,
        data: document,
        message: 'Documento actualizado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Documento no encontrado',
        });
      } else if (errorMessage.includes('Ya existe')) {
        reply.status(409).send({
          success: false,
          error: errorMessage,
          message: 'Conflicto al actualizar documento',
        });
      } else {
        reply.status(400).send({
          success: false,
          error: errorMessage,
          message: 'Error al actualizar documento',
        });
      }
    }
  }
}
