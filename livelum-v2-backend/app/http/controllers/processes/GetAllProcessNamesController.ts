import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { GetAllProcessNamesUseCase } from '../../../../src/processes/application/useCases/GetAllProcessNamesUseCase';

export class GetAllProcessNamesController {

  /**
   * @swagger
   * /api/process-names:
   *   get:
   *     tags:
   *       - process-names
   *     summary: Obtener todos los nombres de proceso
   *     description: Obtiene todos los nombres de proceso ordenados
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
  async handle(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      console.log('GetAllProcessNamesController: Iniciando...');
      const getAllProcessNamesUseCase = container.resolve<GetAllProcessNamesUseCase>(ProcessDependencyIdentifier.GetAllProcessNamesUseCase);
      console.log('GetAllProcessNamesController: Use case resuelto');
      const result = await getAllProcessNamesUseCase.execute();
      console.log('GetAllProcessNamesController: Resultado obtenido:', result);
      
      return reply.status(200).send(result);
    } catch (error) {
      console.error('GetAllProcessNamesController: Error:', error);
      return reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
