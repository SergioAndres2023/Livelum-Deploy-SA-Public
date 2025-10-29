import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { CompleteAuditUseCase } from '../../../../src/audits/application/useCases/CompleteAuditUseCase';
import { CompleteAuditRequest } from '../../../../src/audits/application/dtos/CompleteAuditRequest';

/**
 * Request parameters interface for completing an audit
 * @interface CompleteAuditParams
 */
interface CompleteAuditParams {
  /** The audit ID to complete */
  id: string;
}

/**
 * Request body interface for completing an audit
 * @interface CompleteAuditRequestBody
 */
interface CompleteAuditRequestBody {
  /** Actual date when the audit was completed */
  actualDate: Date;
  /** Findings discovered during the audit */
  findings?: string;
  /** Recommendations based on the audit findings */
  recommendations?: string;
}

/**
 * Controller for handling audit completion requests
 * @class CompleteAuditController
 */
export class CompleteAuditController {
  /**
   * Completes an audit
   * @description Changes the audit status from IN_PROGRESS to COMPLETED and sets the actual completion date
   * @param {FastifyRequest<{ Params: CompleteAuditParams; Body: CompleteAuditRequestBody }>} request - The HTTP request containing audit ID and completion data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * POST /api/audits/507f1f77bcf86cd799439011/complete
   * {
   *   "actualDate": "2024-03-18T00:00:00.000Z",
   *   "findings": "Se identificaron 3 no conformidades menores en el control de versiones de documentos técnicos.",
   *   "recommendations": "Implementar sistema automatizado de control de versiones y capacitar al personal."
   * }
   *
   * @throws {400} Bad Request - When the audit cannot be completed (e.g., not in IN_PROGRESS status or invalid dates)
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{
      Params: CompleteAuditParams;
      Body: CompleteAuditRequestBody;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const completeAuditUseCase = container.resolve<CompleteAuditUseCase>(DependencyIdentifier.CompleteAuditUseCase);

      const completeRequest: CompleteAuditRequest = {
        actualDate: request.body.actualDate,
        findings: request.body.findings,
        recommendations: request.body.recommendations,
      };

      const audit = await completeAuditUseCase.execute(request.params.id, completeRequest);

      reply.status(200).send({
        success: true,
        data: audit,
        message: 'Auditoría completada exitosamente',
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
          message: 'Error al completar auditoría',
        });
      }
    }
  }
}
