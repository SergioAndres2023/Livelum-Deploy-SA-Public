import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { FindDocumentByIdUseCase } from '../../../../src/documents/application/useCases/FindDocumentByIdUseCase';

/**
 * Request parameters interface for finding a document by ID
 * @interface FindDocumentParams
 */
interface FindDocumentParams {
  /** Document's unique identifier */
  id: string;
}

/**
 * Controller for handling document retrieval requests
 * @class FindDocumentController
 */
export class FindDocumentController {
  /**
   * Finds a document by ID
   * @description Retrieves a specific document from the system using its unique identifier
   * @param {FastifyRequest<{ Params: FindDocumentParams }>} request - The HTTP request containing the document ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * GET /api/documents/507f1f77bcf86cd799439011
   *
   * @throws {404} Not Found - When document with the given ID doesn't exist
   * @throws {400} Bad Request - When ID format is invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: FindDocumentParams }>, reply: FastifyReply): Promise<void> {
    try {
      const findDocumentUseCase = container.resolve<FindDocumentByIdUseCase>(DependencyIdentifier.FindDocumentByIdUseCase);

      const document = await findDocumentUseCase.execute(request.params.id);

      if (!document) {
        reply.status(404).send({
          success: false,
          message: 'Documento no encontrado',
        });
        return;
      }

      reply.status(200).send({
        success: true,
        data: document,
        message: 'Documento encontrado exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar documento',
      });
    }
  }
}
