import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { GetAllProcessTypesUseCase } from '../../../../src/processes/application/useCases/GetAllProcessTypesUseCase';

export class GetAllProcessTypesController {

  /**
   * @swagger
   * /api/process-types:
   *   get:
   *     tags:
   *       - process-types
   *     summary: Obtener todos los tipos de proceso
   *     description: Obtiene todos los tipos de proceso ordenados por su campo order
   *     responses:
   *       200:
   *         description: Lista de tipos de proceso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProcessType'
   */
  async handle(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const getAllProcessTypesUseCase = container.resolve<GetAllProcessTypesUseCase>(ProcessDependencyIdentifier.GetAllProcessTypesUseCase);
      const result = await getAllProcessTypesUseCase.execute();
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
