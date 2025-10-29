import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { GetAuditStatsUseCase } from '../../../../src/audits/application/useCases/GetAuditStatsUseCase';

/**
 * Controller for handling audit statistics requests
 * @class GetAuditStatsController
 */
export class GetAuditStatsController {
  /**
   * Gets audit statistics
   * @description Retrieves comprehensive statistics about audits including counts by status, type, and other metrics
   * @param {FastifyRequest} _request - The HTTP request (unused)
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * GET /api/audits/stats
   *
   * Response:
   * {
   *   "success": true,
   *   "data": {
   *     "total": 25,
   *     "planned": 5,
   *     "inProgress": 3,
   *     "completed": 15,
   *     "cancelled": 2,
   *     "overdue": 1,
   *     "upcoming": 4,
   *     "byType": {
   *       "INTERNAL": 20,
   *       "EXTERNAL": 5
   *     }
   *   },
   *   "message": "Estadísticas de auditorías obtenidas exitosamente"
   * }
   *
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const getAuditStatsUseCase = container.resolve<GetAuditStatsUseCase>(DependencyIdentifier.GetAuditStatsUseCase);

      const stats = await getAuditStatsUseCase.execute();

      reply.status(200).send({
        success: true,
        data: stats,
        message: 'Estadísticas de auditorías obtenidas exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al obtener estadísticas de auditorías',
      });
    }
  }
}
