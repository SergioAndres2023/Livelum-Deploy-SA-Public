import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { ProcessDependencyIdentifier } from '../../../../src/processes/domain/dependencyIdentifier/ProcessDependencyIdentifier';
import { UpdateProcessNameUseCase } from '../../../../src/processes/application/useCases/UpdateProcessNameUseCase';
import { UpdateProcessNameRequest } from '../../../../src/processes/application/dtos/UpdateProcessNameRequest';

export class UpdateProcessNameController {

  /**
   * @swagger
   * /api/process-names/{id}:
   *   put:
   *     tags:
   *       - process-names
   *     summary: Actualizar nombre de proceso
   *     description: Actualiza un nombre de proceso existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del nombre de proceso
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
   *                 description: Nuevo orden del nombre de proceso
   *                 example: 2
   *               processTypeId:
   *                 type: string
   *                 description: Nuevo ID del tipo de proceso
   *                 example: "507f1f77bcf86cd799439011"
   *               name:
   *                 type: string
   *                 description: Nuevo nombre del proceso
   *                 example: "SISTEMAS DE GESTIÓN"
   *     responses:
   *       200:
   *         description: Nombre de proceso actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProcessName'
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Nombre de proceso o tipo de proceso no encontrado
   *       409:
   *         description: Conflicto - orden o nombre ya existe
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const updateProcessNameUseCase = container.resolve<UpdateProcessNameUseCase>(ProcessDependencyIdentifier.UpdateProcessNameUseCase);
      const { id } = request.params as { id: string };
      const body = request.body as UpdateProcessNameRequest;
      
      const result = await updateProcessNameUseCase.execute(id, body);
      
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
