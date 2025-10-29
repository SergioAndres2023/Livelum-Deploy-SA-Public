import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CreateAlertUseCase } from '../../../../src/alerts/application/useCases/CreateAlertUseCase';
import { AlertDependencyIdentifier } from '../../../../src/alerts/domain/dependencyIdentifier/AlertDependencyIdentifier';
import { CreateAlertRequest } from '../../../../src/alerts/application/dtos/CreateAlertRequest';

export class CreateAlertController {
  /**
   * @route POST /api/alerts
   * @summary Crear nueva alerta
   * @tags alerts
   * @param {CreateAlertRequest} request.body.required - Datos de la alerta
   * @return {object} 201 - Alerta creada exitosamente
   * @return {ErrorResponse} 400 - Error de validación
   * @return {ErrorResponse} 500 - Error interno del servidor
   */
  async handle(request: FastifyRequest<{ Body: CreateAlertRequest }>, reply: FastifyReply) {
    try {
      const createAlertUseCase = container.resolve<CreateAlertUseCase>(
        AlertDependencyIdentifier.CreateAlertUseCase
      );

      const alert = await createAlertUseCase.execute(request.body);

      return reply.status(201).send({ success: true, data: alert });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Internal Server Error', message: (error as Error).message });
    }
  }
}
