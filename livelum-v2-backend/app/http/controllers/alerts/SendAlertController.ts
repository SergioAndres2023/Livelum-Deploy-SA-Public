import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { SendAlertUseCase } from '../../../../src/alerts/application/useCases/SendAlertUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';

export class SendAlertController {
  /**
   * @route POST /api/alerts/:id/send
   * @summary Enviar alerta
   * @tags alerts
   * @param {string} id.path.required - ID de la alerta
   * @return {object} 200 - Alerta enviada exitosamente
   * @return {ErrorResponse} 404 - Alerta no encontrada
   * @return {ErrorResponse} 400 - Error de validación
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const sendAlertUseCase = container.resolve<SendAlertUseCase>(
        AlertDependencyIdentifier.SendAlertUseCase
      );

      const alert = await sendAlertUseCase.execute(request.params.id);

      return reply.status(200).send({ success: true, data: alert });
    } catch (error) {
      if ((error as Error).message.includes('no encontrada')) {
        return reply.status(404).send({ success: false, error: 'Not Found', message: (error as Error).message });
      }
      if ((error as Error).message.includes('Solo se pueden enviar alertas pendientes')) {
        return reply.status(400).send({ success: false, error: 'Bad Request', message: (error as Error).message });
      }
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
