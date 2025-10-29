import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { DeleteAuditUseCase } from '../../../../src/audits/application/useCases/DeleteAuditUseCase';

/**
 * Request parameters interface for deleting an audit
 * @interface DeleteAuditParams
 */
interface DeleteAuditParams {
  /** The audit ID to delete */
  id: string;
}

/**
 * Controller for handling audit deletion requests
 * @class DeleteAuditController
 */
export class DeleteAuditController {
  /**
   * Deletes an audit (soft delete)
   * @description Performs a soft delete by cancelling the audit instead of removing it from the database
   * @param {FastifyRequest<{ Params: DeleteAuditParams }>} request - The HTTP request containing the audit ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * DELETE /api/audits/507f1f77bcf86cd799439011
   *
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: DeleteAuditParams }>, reply: FastifyReply): Promise<void> {
    try {
      const deleteAuditUseCase = container.resolve<DeleteAuditUseCase>(DependencyIdentifier.DeleteAuditUseCase);

      await deleteAuditUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        message: 'Auditoría eliminada exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('no encontrada')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Auditoría no encontrada',
        });
      } else {
        reply.status(500).send({
          success: false,
          error: errorMessage,
          message: 'Error al eliminar auditoría',
        });
      }
    }
  }
}
