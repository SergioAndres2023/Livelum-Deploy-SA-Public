import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { FindAlertByIdUseCase } from '../../../../src/alerts/application/useCases/FindAlertByIdUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';

export class FindAlertController {
  /**
   * @route GET /api/alerts/:id
   * @summary Obtener alerta por ID
   * @tags alerts
   * @param {string} id.path.required - ID de la alerta
   * @return {object} 200 - Alerta encontrada
   * @return {ErrorResponse} 404 - Alerta no encontrada
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const findAlertByIdUseCase = container.resolve<FindAlertByIdUseCase>(
        AlertDependencyIdentifier.FindAlertByIdUseCase
      );

      const alert = await findAlertByIdUseCase.execute(request.params.id);

      if (!alert) {
        return reply.status(404).send({ success: false, error: 'Not Found', message: 'Alerta no encontrada' });
      }

      return reply.status(200).send({ success: true, data: alert });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
