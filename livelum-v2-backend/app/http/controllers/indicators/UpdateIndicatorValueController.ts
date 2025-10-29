import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { UpdateIndicatorValueUseCase } from '../../../../src/indicators/application/useCases/UpdateIndicatorValueUseCase';
import { UpdateIndicatorValueRequest } from '../../../../src/indicators/application/dtos/UpdateIndicatorValueRequest';

export class UpdateIndicatorValueController {
  /**
   * @swagger
   * /api/indicators/{id}/value:
   *   put:
   *     tags:
   *       - indicators
   *     summary: Actualizar valor del indicador
   *     description: Actualiza únicamente el valor actual de un indicador
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del indicador
   *         example: "65c7a1d0f7b1c2d3e4f5a6b7"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - currentValue
   *             properties:
   *               currentValue:
   *                 type: number
   *                 description: Nuevo valor actual del indicador
   *                 example: 88.5
   *     responses:
   *       200:
   *         description: Valor del indicador actualizado exitosamente
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
   *       400:
   *         description: Error en los datos proporcionados
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   */
  async handle(request: FastifyRequest<{ Params: { id: string }; Body: UpdateIndicatorValueRequest }>, reply: FastifyReply) {
    try {
      const updateIndicatorValueUseCase = container.resolve<UpdateIndicatorValueUseCase>(
        IndicatorDependencyIdentifier.UpdateIndicatorValueUseCase
      );

      const result = await updateIndicatorValueUseCase.execute(request.params.id, request.body);

      return reply.status(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        return reply.status(404).send({
          success: false,
          error: 'Not Found',
          message: errorMessage,
        });
      }

      return reply.status(400).send({
        success: false,
        error: 'Bad Request',
        message: errorMessage,
      });
    }
  }
}
