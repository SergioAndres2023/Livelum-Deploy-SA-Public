import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { GetProcessNamesByTypeUseCase } from '../../../../src/processes/application/useCases/GetProcessNamesByTypeUseCase';

export class GetProcessNamesByTypeController {

  /**
   * @swagger
   * /api/process-names:
   *   get:
   *     tags:
   *       - process-names
   *     summary: Obtener nombres de proceso
   *     description: Obtiene todos los nombres de proceso, opcionalmente filtrados por tipo
   *     parameters:
   *       - in: query
   *         name: processTypeId
   *         schema:
   *           type: string
   *         description: ID del tipo de proceso para filtrar
   *         example: "507f1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: Lista de nombres de proceso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProcessName'
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { processTypeId } = request.query as { processTypeId?: string };
      
      const getProcessNamesByTypeUseCase = container.resolve<GetProcessNamesByTypeUseCase>(ProcessDependencyIdentifier.GetProcessNamesByTypeUseCase);
      const result = await getProcessNamesByTypeUseCase.execute(processTypeId);
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
