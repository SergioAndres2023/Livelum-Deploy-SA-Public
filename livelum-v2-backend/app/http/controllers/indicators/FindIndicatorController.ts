import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { FindIndicatorByIdUseCase } from '../../../../src/indicators/application/useCases/FindIndicatorByIdUseCase';

export class FindIndicatorController {
  /**
   * @swagger
   * /api/indicators/{id}:
   *   get:
   *     tags:
   *       - indicators
   *     summary: Obtener indicador por ID
   *     description: Obtiene un indicador específico por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del indicador
   *         example: "65c7a1d0f7b1c2d3e4f5a6b7"
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
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const findIndicatorByIdUseCase = container.resolve<FindIndicatorByIdUseCase>(
        IndicatorDependencyIdentifier.FindIndicatorByIdUseCase
      );

      const result = await findIndicatorByIdUseCase.execute(request.params.id);

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
