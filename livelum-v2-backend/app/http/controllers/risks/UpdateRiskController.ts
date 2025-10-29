import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { UpdateRiskUseCase } from '../../../../src/risks/application/useCases/UpdateRiskUseCase';
import { UpdateRiskRequest } from '../../../../src/risks/application/dtos/UpdateRiskRequest';

export class UpdateRiskController {

  /**
   * @swagger
   * /api/risks/{id}:
   *   put:
   *     tags:
   *       - risks
   *     summary: Actualizar un riesgo
   *     description: Actualiza un riesgo existente por su ID. El nivel de riesgo se recalcula automáticamente si cambia la probabilidad o impacto.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del riesgo a actualizar
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: Nuevo título del riesgo
   *                 example: "Falla en Sistema de Información Actualizado"
   *                 maxLength: 200
   *               category:
   *                 type: string
   *                 enum: [TECNOLOGICO, RECURSOS_HUMANOS, REGULATORIO, OPERACIONAL, FINANCIERO, ESTRATEGICO, COMPLIANCE, SEGURIDAD]
   *                 description: Nueva categoría del riesgo
   *                 example: "TECNOLOGICO"
   *               probability:
   *                 type: string
   *                 enum: [BAJA, MEDIA, ALTA]
   *                 description: Nueva probabilidad de ocurrencia
   *                 example: "MEDIA"
   *               impact:
   *                 type: string
   *                 enum: [BAJO, MEDIO, ALTO]
   *                 description: Nuevo impacto del riesgo
   *                 example: "MEDIO"
   *               owner:
   *                 type: string
   *                 description: Nuevo responsable del riesgo
   *                 example: "María García"
   *                 maxLength: 100
   *               dueDate:
   *                 type: string
   *                 format: date
   *                 description: Nueva fecha límite
   *                 example: "2024-03-15"
   *               description:
   *                 type: string
   *                 description: Nueva descripción del riesgo
   *                 example: "Descripción actualizada del riesgo"
   *                 maxLength: 1000
   *               mitigation:
   *                 type: string
   *                 description: Nuevo plan de mitigación
   *                 example: "Plan de mitigación actualizado"
   *                 maxLength: 1000
   *               status:
   *                 type: string
   *                 enum: [ACTIVE, MONITORED, MITIGATED, CLOSED]
   *                 description: Nuevo estado del riesgo
   *                 example: "MONITORED"
   *     responses:
   *       200:
   *         description: Riesgo actualizado exitosamente
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
      const body = request.body as UpdateRiskRequest;
      
      const updateRiskUseCase = container.resolve<UpdateRiskUseCase>(RiskDependencyIdentifier.UpdateRiskUseCase);
      const result = await updateRiskUseCase.execute(id, body);
      
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
