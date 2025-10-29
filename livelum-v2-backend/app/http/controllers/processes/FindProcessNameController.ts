import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { FindProcessNameByIdUseCase } from '../../../../src/processes/application/useCases/FindProcessNameByIdUseCase';

export class FindProcessNameController {

  /**
   * @swagger
   * /api/process-names/{id}:
   *   get:
   *     tags:
   *       - process-names
   *     summary: Obtener nombre de proceso por ID
   *     description: Obtiene un nombre de proceso específico por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del nombre de proceso
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: Nombre de proceso encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProcessName'
   *       404:
   *         description: Nombre de proceso no encontrado
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      
      const findProcessNameByIdUseCase = container.resolve<FindProcessNameByIdUseCase>(ProcessDependencyIdentifier.FindProcessNameByIdUseCase);
      const result = await findProcessNameByIdUseCase.execute(id);
      
      if (!result) {
        reply.status(404).send({ error: 'Nombre de proceso no encontrado' });
        return;
      }
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
