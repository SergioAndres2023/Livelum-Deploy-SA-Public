import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { ChangeRiskStatusUseCase } from '../../../../src/risks/application/useCases/ChangeRiskStatusUseCase';
import { ChangeRiskStatusRequest } from '../../../../src/risks/application/dtos/ChangeRiskStatusRequest';

export class ChangeRiskStatusController {

  /**
   * @swagger
   * /api/risks/{id}/status:
   *   put:
   *     tags:
   *       - risks
   *     summary: Cambiar estado de un riesgo
   *     description: Cambia el estado de un riesgo existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del riesgo
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - status
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [ACTIVE, MONITORED, MITIGATED, CLOSED]
   *                 description: Nuevo estado del riesgo
   *                 example: "MITIGATED"
   *     responses:
   *       200:
   *         description: Estado del riesgo actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Risk'
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Riesgo no encontrado
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as ChangeRiskStatusRequest;
      
      const changeRiskStatusUseCase = container.resolve<ChangeRiskStatusUseCase>(RiskDependencyIdentifier.ChangeRiskStatusUseCase);
      const result = await changeRiskStatusUseCase.execute(id, body);
      
      reply.status(200).send(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({ error: errorMessage });
      } else if (errorMessage.includes('debe ser') || errorMessage.includes('requerido')) {
        reply.status(400).send({ error: errorMessage });
      } else {
        reply.status(500).send({ error: 'Error interno del servidor' });
      }
    }
  }
}
