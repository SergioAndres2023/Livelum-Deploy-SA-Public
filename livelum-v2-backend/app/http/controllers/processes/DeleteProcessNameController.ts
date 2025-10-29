import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { DeleteProcessNameUseCase } from '../../../../src/processes/application/useCases/DeleteProcessNameUseCase';

export class DeleteProcessNameController {

  /**
   * @swagger
   * /api/process-names/{id}:
   *   delete:
   *     tags:
   *       - process-names
   *     summary: Eliminar nombre de proceso
   *     description: Elimina un nombre de proceso por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del nombre de proceso
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       204:
   *         description: Nombre de proceso eliminado exitosamente
   *       404:
   *         description: Nombre de proceso no encontrado
   *       409:
   *         description: No se puede eliminar porque tiene fichas asociadas
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      
      const deleteProcessNameUseCase = container.resolve<DeleteProcessNameUseCase>(ProcessDependencyIdentifier.DeleteProcessNameUseCase);
      await deleteProcessNameUseCase.execute(id);
      
      reply.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({ error: errorMessage });
      } else if (errorMessage.includes('asociadas')) {
        reply.status(409).send({ error: errorMessage });
      } else {
        reply.status(500).send({ error: 'Error interno del servidor' });
      }
    }
  }
}
