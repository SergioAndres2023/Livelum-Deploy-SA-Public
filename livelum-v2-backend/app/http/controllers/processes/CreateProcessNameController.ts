import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { CreateProcessNameUseCase } from '../../../../src/processes/application/useCases/CreateProcessNameUseCase';
import { CreateProcessNameRequest } from '../../../../src/processes/application/dtos/CreateProcessNameRequest';

export class CreateProcessNameController {

  /**
   * @swagger
   * /api/process-names:
   *   post:
   *     tags:
   *       - process-names
   *     summary: Crear un nuevo nombre de proceso
   *     description: Crea un nuevo nombre de proceso asociado a un tipo de proceso
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - order
   *               - processTypeId
   *               - name
   *             properties:
   *               order:
   *                 type: number
   *                 description: Orden del nombre de proceso dentro del tipo
   *                 example: 1
   *               processTypeId:
   *                 type: string
   *                 description: ID del tipo de proceso
   *                 example: "507f1f77bcf86cd799439011"
   *               name:
   *                 type: string
   *                 description: Nombre del proceso
   *                 example: "SISTEMAS"
   *     responses:
   *       201:
   *         description: Nombre de proceso creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProcessName'
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Tipo de proceso no encontrado
   *       409:
   *         description: Conflicto - orden o nombre ya existe
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const body = request.body as CreateProcessNameRequest;
      
      const createProcessNameUseCase = container.resolve<CreateProcessNameUseCase>(ProcessDependencyIdentifier.CreateProcessNameUseCase);
      const result = await createProcessNameUseCase.execute(body);
      
      reply.status(201).send(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({ error: errorMessage });
      } else if (errorMessage.includes('Ya existe')) {
        reply.status(409).send({ error: errorMessage });
      } else if (errorMessage.includes('debe ser') || errorMessage.includes('requerido')) {
        reply.status(400).send({ error: errorMessage });
      } else {
        reply.status(500).send({ error: 'Error interno del servidor' });
      }
    }
  }
}
