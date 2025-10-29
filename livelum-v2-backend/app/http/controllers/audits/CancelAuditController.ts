import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { CancelAuditUseCase } from '../../../../src/audits/application/useCases/CancelAuditUseCase';

/**
 * Request parameters interface for cancelling an audit
 * @interface CancelAuditParams
 */
interface CancelAuditParams {
  /** The audit ID to cancel */
  id: string;
}

/**
 * Controller for handling audit cancellation requests
 * @class CancelAuditController
 */
export class CancelAuditController {
  /**
   * Cancels an audit
   * @description Changes the audit status to CANCELLED
   * @param {FastifyRequest<{ Params: CancelAuditParams }>} request - The HTTP request containing the audit ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * POST /api/audits/507f1f77bcf86cd799439011/cancel
   *
   * @throws {400} Bad Request - When the audit cannot be cancelled (e.g., already completed)
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: CancelAuditParams }>, reply: FastifyReply): Promise<void> {
    try {
      const cancelAuditUseCase = container.resolve<CancelAuditUseCase>(DependencyIdentifier.CancelAuditUseCase);

      const audit = await cancelAuditUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        data: audit,
        message: 'Auditoría cancelada exitosamente',
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
        reply.status(400).send({
          success: false,
          error: errorMessage,
          message: 'Error al cancelar auditoría',
        });
      }
    }
  }
}
