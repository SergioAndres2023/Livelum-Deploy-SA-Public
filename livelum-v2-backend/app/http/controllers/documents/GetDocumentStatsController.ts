import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { GetDocumentStatsUseCase } from '../../../../src/documents/application/useCases/GetDocumentStatsUseCase';

/**
 * Controller for handling document statistics requests
 * @class GetDocumentStatsController
 */
export class GetDocumentStatsController {
  /**
   * Gets document statistics
   * @description Retrieves comprehensive statistics about documents in the system
   * @param {FastifyRequest} request - The HTTP request
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * GET /api/documents/stats
   *
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const getDocumentStatsUseCase = container.resolve<GetDocumentStatsUseCase>(DependencyIdentifier.GetDocumentStatsUseCase);

      const stats = await getDocumentStatsUseCase.execute();

      reply.status(200).send({
        success: true,
        data: stats,
        message: 'Estadísticas de documentos obtenidas exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al obtener estadísticas de documentos',
      });
    }
  }
}
