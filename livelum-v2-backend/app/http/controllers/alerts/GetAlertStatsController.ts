import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { GetAlertStatsUseCase } from '../../../../src/alerts/application/useCases/GetAlertStatsUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';
import { AlertStatsResponse } from '../../../../src/alerts/application/dtos/AlertStatsResponse';

export class GetAlertStatsController {
  /**
   * @route GET /api/alerts/stats
   * @summary Obtener estadísticas de alertas
   * @tags alerts
   * @return {object} 200 - Estadísticas de alertas
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const getAlertStatsUseCase = container.resolve<GetAlertStatsUseCase>(
        AlertDependencyIdentifier.GetAlertStatsUseCase
      );

      const stats: AlertStatsResponse = await getAlertStatsUseCase.execute();

      return reply.status(200).send({ success: true, data: stats });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
