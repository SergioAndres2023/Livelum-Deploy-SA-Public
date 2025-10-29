import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { StartAuditUseCase } from '../../../../src/audits/application/useCases/StartAuditUseCase';

/**
 * Request parameters interface for starting an audit
 * @interface StartAuditParams
 */
interface StartAuditParams {
  /** The audit ID to start */
  id: string;
}

/**
 * Controller for handling audit start requests
 * @class StartAuditController
 */
export class StartAuditController {
  /**
   * Starts an audit
   * @description Changes the audit status from PLANNED to IN_PROGRESS
   * @param {FastifyRequest<{ Params: StartAuditParams }>} request - The HTTP request containing the audit ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * POST /api/audits/507f1f77bcf86cd799439011/start
   *
   * @throws {400} Bad Request - When the audit cannot be started (e.g., not in PLANNED status)
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: StartAuditParams }>, reply: FastifyReply): Promise<void> {
    try {
      const startAuditUseCase = container.resolve<StartAuditUseCase>(DependencyIdentifier.StartAuditUseCase);

      const audit = await startAuditUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        data: audit,
        message: 'Auditoría iniciada exitosamente',
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
          message: 'Error al iniciar auditoría',
        });
      }
    }
  }
}
