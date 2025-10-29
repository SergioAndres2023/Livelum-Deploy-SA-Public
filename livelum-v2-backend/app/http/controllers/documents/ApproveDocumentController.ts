import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { ApproveDocumentUseCase } from '../../../../src/documents/application/useCases/ApproveDocumentUseCase';

/**
 * Request parameters interface for approving a document
 * @interface ApproveDocumentParams
 */
interface ApproveDocumentParams {
  /** Document's unique identifier */
  id: string;
}

/**
 * Controller for handling document approval requests
 * @class ApproveDocumentController
 */
export class ApproveDocumentController {
  /**
   * Approves a document
   * @description Approves a document that is currently in review status
   * @param {FastifyRequest<{ Params: ApproveDocumentParams }>} request - The HTTP request containing the document ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * POST /api/documents/507f1f77bcf86cd799439011/approve
   *
   * @throws {404} Not Found - When document with the given ID doesn't exist
   * @throws {400} Bad Request - When document is not in review status
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: ApproveDocumentParams }>, reply: FastifyReply): Promise<void> {
    try {
      const approveDocumentUseCase = container.resolve<ApproveDocumentUseCase>(DependencyIdentifier.ApproveDocumentUseCase);

      const document = await approveDocumentUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        data: document,
        message: 'Documento aprobado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Documento no encontrado',
        });
      } else if (errorMessage.includes('Solo se pueden aprobar')) {
        reply.status(400).send({
          success: false,
          error: errorMessage,
          message: 'El documento no está en estado de revisión',
        });
      } else {
        reply.status(500).send({
          success: false,
          error: errorMessage,
          message: 'Error al aprobar documento',
        });
      }
    }
  }
}
