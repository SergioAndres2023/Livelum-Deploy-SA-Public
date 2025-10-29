import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SearchAlertsUseCase } from '../../../../src/alerts/application/useCases/SearchAlertsUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';
import { SearchAlertsRequest } from '../../../../src/alerts/application/dtos/SearchAlertsRequest';

export class SearchAlertsController {
  /**
   * @route GET /api/alerts
   * @summary Buscar alertas con filtros
   * @tags alerts
   * @param {SearchAlertsRequest} request.query - Filtros de búsqueda
   * @return {object} 200 - Lista de alertas encontradas
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Querystring: SearchAlertsRequest }>, reply: FastifyReply) {
    try {
      const searchAlertsUseCase = container.resolve<SearchAlertsUseCase>(
        AlertDependencyIdentifier.SearchAlertsUseCase
      );

      const alerts = await searchAlertsUseCase.execute(request.query);

      return reply.status(200).send({ success: true, data: alerts });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
