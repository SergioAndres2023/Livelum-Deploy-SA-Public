import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { FindRiskByIdUseCase } from '../../../../src/risks/application/useCases/FindRiskByIdUseCase';

export class FindRiskController {

  /**
   * @swagger
   * /api/risks/{id}:
   *   get:
   *     tags:
   *       - risks
   *     summary: Obtener riesgo por ID
   *     description: Obtiene un riesgo específico por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del riesgo
   *     responses:
   *       200:
   *         description: Riesgo encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Risk'
   *       404:
   *         description: Riesgo no encontrado
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      
      const findRiskByIdUseCase = container.resolve<FindRiskByIdUseCase>(RiskDependencyIdentifier.FindRiskByIdUseCase);
      const result = await findRiskByIdUseCase.execute(id);
      
      if (!result) {
        reply.status(404).send({ error: 'Riesgo no encontrado' });
        return;
      }
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
