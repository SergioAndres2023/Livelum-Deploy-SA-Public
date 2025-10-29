import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { DeleteDocumentUseCase } from '../../../../src/documents/application/useCases/DeleteDocumentUseCase';

/**
 * Request parameters interface for deleting a document
 * @interface DeleteDocumentParams
 */
interface DeleteDocumentParams {
  /** Document's unique identifier */
  id: string;
}

/**
 * Controller for handling document deletion requests
 * @class DeleteDocumentController
 */
export class DeleteDocumentController {
  /**
   * Deletes a document by ID
   * @description Permanently removes a document from the system using its unique identifier (soft delete - archives the document)
   * @param {FastifyRequest<{ Params: DeleteDocumentParams }>} request - The HTTP request containing the document ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * DELETE /api/documents/507f1f77bcf86cd799439011
   *
   * @throws {404} Not Found - When document with the given ID doesn't exist
   * @throws {400} Bad Request - When ID format is invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: DeleteDocumentParams }>, reply: FastifyReply): Promise<void> {
    try {
      const deleteDocumentUseCase = container.resolve<DeleteDocumentUseCase>(DependencyIdentifier.DeleteDocumentUseCase);

      await deleteDocumentUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        message: 'Documento eliminado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Documento no encontrado',
        });
      } else {
        reply.status(500).send({
          success: false,
          error: errorMessage,
          message: 'Error al eliminar documento',
        });
      }
    }
  }
}
