import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { RescheduleAuditUseCase } from '../../../../src/audits/application/useCases/RescheduleAuditUseCase';
import { RescheduleAuditRequest } from '../../../../src/audits/application/dtos/RescheduleAuditRequest';

/**
 * Request parameters interface for rescheduling an audit
 * @interface RescheduleAuditParams
 */
interface RescheduleAuditParams {
  /** The audit ID to reschedule */
  id: string;
}

/**
 * Request body interface for rescheduling an audit
 * @interface RescheduleAuditRequestBody
 */
interface RescheduleAuditRequestBody {
  /** New planned date for the audit */
  newPlannedDate: Date;
}

/**
 * Controller for handling audit rescheduling requests
 * @class RescheduleAuditController
 */
export class RescheduleAuditController {
  /**
   * Reschedules an audit
   * @description Updates the planned date of an audit to a new date
   * @param {FastifyRequest<{ Params: RescheduleAuditParams; Body: RescheduleAuditRequestBody }>} request - The HTTP request containing audit ID and new date
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * PUT /api/audits/507f1f77bcf86cd799439011/reschedule
   * {
   *   "newPlannedDate": "2024-04-15T00:00:00.000Z"
   * }
   *
   * @throws {400} Bad Request - When the audit cannot be rescheduled (e.g., already completed or cancelled)
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{
      Params: RescheduleAuditParams;
      Body: RescheduleAuditRequestBody;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const rescheduleAuditUseCase = container.resolve<RescheduleAuditUseCase>(DependencyIdentifier.RescheduleAuditUseCase);

      const rescheduleRequest: RescheduleAuditRequest = {
        newPlannedDate: request.body.newPlannedDate,
      };

      const audit = await rescheduleAuditUseCase.execute(request.params.id, rescheduleRequest);

      reply.status(200).send({
        success: true,
        data: audit,
        message: 'Auditoría reprogramada exitosamente',
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
          message: 'Error al reprogramar auditoría',
        });
      }
    }
  }
}
