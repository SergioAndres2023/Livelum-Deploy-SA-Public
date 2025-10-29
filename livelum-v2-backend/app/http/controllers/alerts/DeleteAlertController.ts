import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DeleteAlertUseCase } from '../../../../src/alerts/application/useCases/DeleteAlertUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';

export class DeleteAlertController {
  /**
   * @route DELETE /api/alerts/:id
   * @summary Eliminar alerta
   * @tags alerts
   * @param {string} id.path.required - ID de la alerta
   * @return {object} 200 - Alerta eliminada exitosamente
   * @return {ErrorResponse} 404 - Alerta no encontrada
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deleteAlertUseCase = container.resolve<DeleteAlertUseCase>(
        AlertDependencyIdentifier.DeleteAlertUseCase
      );

      await deleteAlertUseCase.execute(request.params.id);

      return reply.status(200).send({ success: true, message: 'Alerta eliminada exitosamente' });
    } catch (error) {
      if ((error as Error).message.includes('no encontrada')) {
        return reply.status(404).send({ success: false, error: 'Not Found', message: (error as Error).message });
      }
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
