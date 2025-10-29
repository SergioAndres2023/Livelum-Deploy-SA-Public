import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { FindIndicatorByCodeUseCase } from '../../../../src/indicators/application/useCases/FindIndicatorByCodeUseCase';

export class FindIndicatorByCodeController {
  /**
   * @swagger
   * /api/indicators/code/{code}:
   *   get:
   *     tags:
   *       - indicators
   *     summary: Obtener indicador por código
   *     description: Obtiene un indicador específico por su código
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *         description: Código del indicador
   *         example: "IND-001"
   *     responses:
   *       200:
   *         description: Indicador encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/definitions/Indicator'
   *       404:
   *         description: Indicador no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   */
  async handle(request: FastifyRequest<{ Params: { code: string } }>, reply: FastifyReply) {
    try {
      const findIndicatorByCodeUseCase = container.resolve<FindIndicatorByCodeUseCase>(
        IndicatorDependencyIdentifier.FindIndicatorByCodeUseCase
      );

      const result = await findIndicatorByCodeUseCase.execute(request.params.code);

      if (!result) {
        return reply.status(404).send({
          success: false,
          error: 'Not Found',
          message: 'Indicador no encontrado',
        });
      }

      return reply.status(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Internal Server Error',
        message: (error as Error).message,
      });
    }
  }
}
