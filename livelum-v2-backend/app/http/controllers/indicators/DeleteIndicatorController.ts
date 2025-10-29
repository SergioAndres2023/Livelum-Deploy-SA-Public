import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { DeleteIndicatorUseCase } from '../../../../src/indicators/application/useCases/DeleteIndicatorUseCase';

export class DeleteIndicatorController {
  /**
   * @swagger
   * /api/indicators/{id}:
   *   delete:
   *     tags:
   *       - indicators
   *     summary: Eliminar indicador
   *     description: Elimina un indicador por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del indicador
   *         example: "65c7a1d0f7b1c2d3e4f5a6b7"
   *     responses:
   *       204:
   *         description: Indicador eliminado exitosamente
   *       404:
   *         description: Indicador no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   */
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deleteIndicatorUseCase = container.resolve<DeleteIndicatorUseCase>(
        IndicatorDependencyIdentifier.DeleteIndicatorUseCase
      );

      await deleteIndicatorUseCase.execute(request.params.id);

      return reply.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        return reply.status(404).send({
          success: false,
          error: 'Not Found',
          message: errorMessage,
        });
      }

      return reply.status(500).send({
        success: false,
        error: 'Internal Server Error',
        message: errorMessage,
      });
    }
  }
}
