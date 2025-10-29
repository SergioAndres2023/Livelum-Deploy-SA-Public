import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateAlertUseCase } from '../../../../src/alerts/application/useCases/UpdateAlertUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';
import { UpdateAlertRequest } from '../../../../src/alerts/application/dtos/UpdateAlertRequest';

export class UpdateAlertController {
  /**
   * @route PUT /api/alerts/:id
   * @summary Actualizar alerta
   * @tags alerts
   * @param {string} id.path.required - ID de la alerta
   * @param {UpdateAlertRequest} request.body.required - Datos a actualizar
   * @return {object} 200 - Alerta actualizada exitosamente
   * @return {ErrorResponse} 404 - Alerta no encontrada
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Params: { id: string }; Body: UpdateAlertRequest }>, reply: FastifyReply) {
    try {
      const updateAlertUseCase = container.resolve<UpdateAlertUseCase>(
        AlertDependencyIdentifier.UpdateAlertUseCase
      );

      const alert = await updateAlertUseCase.execute(request.params.id, request.body);

      return reply.status(200).send({ success: true, data: alert });
    } catch (error) {
      if ((error as Error).message.includes('no encontrada')) {
        return reply.status(404).send({ success: false, error: 'Not Found', message: (error as Error).message });
      }
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
