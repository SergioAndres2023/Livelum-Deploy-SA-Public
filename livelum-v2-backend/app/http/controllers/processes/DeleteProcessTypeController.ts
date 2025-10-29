import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { DeleteProcessTypeUseCase } from '../../../../src/processes/application/useCases/DeleteProcessTypeUseCase';

export class DeleteProcessTypeController {

  /**
   * @swagger
   * /api/process-types/{id}:
   *   delete:
   *     tags:
   *       - process-types
   *     summary: Eliminar tipo de proceso
   *     description: Elimina un tipo de proceso por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del tipo de proceso
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       204:
   *         description: Tipo de proceso eliminado exitosamente
   *       404:
   *         description: Tipo de proceso no encontrado
   *       409:
   *         description: No se puede eliminar porque tiene nombres asociados
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      
      const deleteProcessTypeUseCase = container.resolve<DeleteProcessTypeUseCase>(ProcessDependencyIdentifier.DeleteProcessTypeUseCase);
      await deleteProcessTypeUseCase.execute(id);
      
      reply.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({ error: errorMessage });
      } else if (errorMessage.includes('asociados')) {
        reply.status(409).send({ error: errorMessage });
      } else {
        reply.status(500).send({ error: 'Error interno del servidor' });
      }
    }
  }
}
