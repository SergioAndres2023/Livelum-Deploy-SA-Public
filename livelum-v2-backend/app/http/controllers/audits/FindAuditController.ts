import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { FindAuditByIdUseCase } from '../../../../src/audits/application/useCases/FindAuditByIdUseCase';

/**
 * Request parameters interface for finding an audit by ID
 * @interface FindAuditParams
 */
interface FindAuditParams {
  /** The audit ID */
  id: string;
}

/**
 * Controller for handling audit retrieval requests
 * @class FindAuditController
 */
export class FindAuditController {
  /**
   * Finds an audit by its ID
   * @description Retrieves a specific audit from the system by its unique identifier
   * @param {FastifyRequest<{ Params: FindAuditParams }>} request - The HTTP request containing the audit ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * GET /api/audits/507f1f77bcf86cd799439011
   *
   * @throws {404} Not Found - When the audit is not found
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: FindAuditParams }>, reply: FastifyReply): Promise<void> {
    try {
      const findAuditByIdUseCase = container.resolve<FindAuditByIdUseCase>(DependencyIdentifier.FindAuditByIdUseCase);

      const audit = await findAuditByIdUseCase.execute(request.params.id);

      if (!audit) {
        reply.status(404).send({
          success: false,
          message: 'Auditoría no encontrada',
        });
        return;
      }

      reply.status(200).send({
        success: true,
        data: audit,
        message: 'Auditoría encontrada exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar auditoría',
      });
    }
  }
}
