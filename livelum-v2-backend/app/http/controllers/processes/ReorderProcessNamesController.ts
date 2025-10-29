import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { ReorderProcessNamesUseCase } from '../../../../src/processes/application/useCases/ReorderProcessNamesUseCase';
import { ReorderProcessNamesRequest } from '../../../../src/processes/application/dtos/ReorderProcessNamesRequest';

export class ReorderProcessNamesController {

  /**
   * @swagger
   * /api/process-names/reorder:
   *   put:
   *     tags:
   *       - process-names
   *     summary: Reordenar nombres de proceso
   *     description: Actualiza el orden de múltiples nombres de proceso
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - reorderItems
   *             properties:
   *               reorderItems:
   *                 type: array
   *                 description: Lista de items a reordenar
   *                 items:
   *                   type: object
   *                   required:
   *                     - id
   *                     - order
   *                   properties:
   *                     id:
   *                       type: string
   *                       description: ID del nombre de proceso
   *                       example: "507f1f77bcf86cd799439011"
   *                     order:
   *                       type: number
   *                       description: Nuevo orden
   *                       example: 1
   *     responses:
   *       200:
   *         description: Nombres de proceso reordenados exitosamente
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Uno o más nombres de proceso no encontrados
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as ReorderProcessNamesRequest;
      
      const reorderProcessNamesUseCase = container.resolve<ReorderProcessNamesUseCase>(ProcessDependencyIdentifier.ReorderProcessNamesUseCase);
      await reorderProcessNamesUseCase.execute(body);
      
      reply.status(200).send({ message: 'Nombres de proceso reordenados exitosamente' });
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
