import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { FindProcessTypeByIdUseCase } from '../../../../src/processes/application/useCases/FindProcessTypeByIdUseCase';

export class FindProcessTypeController {

  /**
   * @swagger
   * /api/process-types/{id}:
   *   get:
   *     tags:
   *       - process-types
   *     summary: Obtener tipo de proceso por ID
   *     description: Obtiene un tipo de proceso específico por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del tipo de proceso
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: Tipo de proceso encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProcessType'
   *       404:
   *         description: Tipo de proceso no encontrado
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      
      const findProcessTypeByIdUseCase = container.resolve<FindProcessTypeByIdUseCase>(ProcessDependencyIdentifier.FindProcessTypeByIdUseCase);
      const result = await findProcessTypeByIdUseCase.execute(id);
      
      if (!result) {
        reply.status(404).send({ error: 'Tipo de proceso no encontrado' });
        return;
      }
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
