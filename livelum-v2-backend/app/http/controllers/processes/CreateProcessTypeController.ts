import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { CreateProcessTypeUseCase } from '../../../../src/processes/application/useCases/CreateProcessTypeUseCase';
import { CreateProcessTypeRequest } from '../../../../src/processes/application/dtos/CreateProcessTypeRequest';

export class CreateProcessTypeController {

  /**
   * @swagger
   * /api/process-types:
   *   post:
   *     tags:
   *       - process-types
   *     summary: Crear un nuevo tipo de proceso
   *     description: Crea un nuevo tipo de proceso con orden, nombre y links opcionales
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - order
   *               - name
   *             properties:
   *               order:
   *                 type: number
   *                 description: Orden del tipo de proceso
   *                 example: 1
   *               name:
   *                 type: string
   *                 description: Nombre del tipo de proceso
   *                 example: "PROCESOS ESTRATÉGICOS"
   *               links:
   *                 type: array
   *                 description: Lista de links asociados
   *                 items:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: "Manual de Calidad"
   *                     path:
   *                       type: string
   *                       example: "/documents/manual-calidad.pdf"
   *     responses:
   *       201:
   *         description: Tipo de proceso creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProcessType'
   *       400:
   *         description: Error de validación
   *       409:
   *         description: Conflicto - orden o nombre ya existe
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const createProcessTypeUseCase = container.resolve<CreateProcessTypeUseCase>(ProcessDependencyIdentifier.CreateProcessTypeUseCase);
      const body = request.body as CreateProcessTypeRequest;
      
      const result = await createProcessTypeUseCase.execute(body);
      
      reply.status(201).send(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('Ya existe')) {
        reply.status(409).send({ error: errorMessage });
      } else if (errorMessage.includes('debe ser') || errorMessage.includes('requerido')) {
        reply.status(400).send({ error: errorMessage });
      } else {
        reply.status(500).send({ error: 'Error interno del servidor' });
      }
    }
  }
}
