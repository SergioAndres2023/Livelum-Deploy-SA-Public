import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { FindRiskByCodeUseCase } from '../../../../src/risks/application/useCases/FindRiskByCodeUseCase';

export class FindRiskByCodeController {

  /**
   * @swagger
   * /api/risks/code/{code}:
   *   get:
   *     tags:
   *       - risks
   *     summary: Obtener riesgo por código
   *     description: Obtiene un riesgo específico por su código único
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *         description: Código del riesgo
   *         example: "R-001"
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
      const { code } = request.params as { code: string };
      
      const findRiskByCodeUseCase = container.resolve<FindRiskByCodeUseCase>(RiskDependencyIdentifier.FindRiskByCodeUseCase);
      const result = await findRiskByCodeUseCase.execute(code);
      
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
