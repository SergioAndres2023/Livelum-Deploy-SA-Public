import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { UpdateProcessTypeUseCase } from '../../../../src/processes/application/useCases/UpdateProcessTypeUseCase';
import { UpdateProcessTypeRequest } from '../../../../src/processes/application/dtos/UpdateProcessTypeRequest';

export class UpdateProcessTypeController {

  /**
   * @swagger
   * /api/process-types/{id}:
   *   put:
   *     tags:
   *       - process-types
   *     summary: Actualizar tipo de proceso
   *     description: Actualiza un tipo de proceso existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del tipo de proceso
   *         example: "507f1f77bcf86cd799439011"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               order:
   *                 type: number
   *                 description: Nuevo orden del tipo de proceso
   *                 example: 2
   *               name:
   *                 type: string
   *                 description: Nuevo nombre del tipo de proceso
   *                 example: "PROCESOS DE FABRICACIÓN"
   *               links:
   *                 type: array
   *                 description: Nueva lista de links asociados
   *                 items:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: "Manual de Producción"
   *                     path:
   *                       type: string
   *                       example: "/documents/manual-produccion.pdf"
   *     responses:
   *       200:
   *         description: Tipo de proceso actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProcessType'
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Tipo de proceso no encontrado
   *       409:
   *         description: Conflicto - orden o nombre ya existe
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as UpdateProcessTypeRequest;
      
      const updateProcessTypeUseCase = container.resolve<UpdateProcessTypeUseCase>(ProcessDependencyIdentifier.UpdateProcessTypeUseCase);
      const result = await updateProcessTypeUseCase.execute(id, body);
      
      reply.status(200).send(result);
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
