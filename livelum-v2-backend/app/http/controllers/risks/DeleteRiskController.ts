import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { DeleteRiskUseCase } from '../../../../src/risks/application/useCases/DeleteRiskUseCase';

export class DeleteRiskController {

  /**
   * @swagger
   * /api/risks/{id}:
   *   delete:
   *     tags:
   *       - risks
   *     summary: Eliminar un riesgo
   *     description: Elimina un riesgo existente por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del riesgo a eliminar
   *     responses:
   *       204:
   *         description: Riesgo eliminado exitosamente
   *       404:
   *         description: Riesgo no encontrado
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      
      const deleteRiskUseCase = container.resolve<DeleteRiskUseCase>(RiskDependencyIdentifier.DeleteRiskUseCase);
      await deleteRiskUseCase.execute(id);
      
      reply.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({ error: errorMessage });
      } else {
        reply.status(500).send({ error: 'Error interno del servidor' });
      }
    }
  }
}
