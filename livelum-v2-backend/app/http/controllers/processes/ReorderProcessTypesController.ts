import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { ReorderProcessTypesUseCase } from '../../../../src/processes/application/useCases/ReorderProcessTypesUseCase';
import { ReorderProcessTypesRequest } from '../../../../src/processes/application/dtos/ReorderProcessTypesRequest';

export class ReorderProcessTypesController {

  /**
   * @swagger
   * /api/process-types/reorder:
   *   put:
   *     tags:
   *       - process-types
   *     summary: Reordenar tipos de proceso
   *     description: Actualiza el orden de múltiples tipos de proceso
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
   *                       description: ID del tipo de proceso
   *                       example: "507f1f77bcf86cd799439011"
   *                     order:
   *                       type: number
   *                       description: Nuevo orden
   *                       example: 1
   *     responses:
   *       200:
   *         description: Tipos de proceso reordenados exitosamente
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Uno o más tipos de proceso no encontrados
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as ReorderProcessTypesRequest;
      
      const reorderProcessTypesUseCase = container.resolve<ReorderProcessTypesUseCase>(ProcessDependencyIdentifier.ReorderProcessTypesUseCase);
      await reorderProcessTypesUseCase.execute(body);
      
      reply.status(200).send({ message: 'Tipos de proceso reordenados exitosamente' });
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
