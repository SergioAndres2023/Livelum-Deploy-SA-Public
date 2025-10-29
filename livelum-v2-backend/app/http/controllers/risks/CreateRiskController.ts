import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { CreateRiskUseCase } from '../../../../src/risks/application/useCases/CreateRiskUseCase';
import { CreateRiskRequest } from '../../../../src/risks/application/dtos/CreateRiskRequest';

export class CreateRiskController {

  /**
   * @swagger
   * /api/risks:
   *   post:
   *     tags:
   *       - risks
   *     summary: Crear un nuevo riesgo
   *     description: Crea un nuevo riesgo con todos los campos requeridos. El nivel de riesgo se calcula automáticamente basado en probabilidad e impacto.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - code
   *               - category
   *               - probability
   *               - impact
   *               - owner
   *               - dueDate
   *               - description
   *               - mitigation
   *             properties:
   *               title:
   *                 type: string
   *                 description: Título del riesgo
   *                 example: "Falla en Sistema de Información"
   *                 maxLength: 200
   *               code:
   *                 type: string
   *                 description: Código único del riesgo
   *                 example: "R-001"
   *                 maxLength: 20
   *               category:
   *                 type: string
   *                 enum: [TECNOLOGICO, RECURSOS_HUMANOS, REGULATORIO, OPERACIONAL, FINANCIERO, ESTRATEGICO, COMPLIANCE, SEGURIDAD]
   *                 description: Categoría del riesgo
   *                 example: "TECNOLOGICO"
   *               probability:
   *                 type: string
   *                 enum: [BAJA, MEDIA, ALTA]
   *                 description: Probabilidad de ocurrencia
   *                 example: "ALTA"
   *               impact:
   *                 type: string
   *                 enum: [BAJO, MEDIO, ALTO]
   *                 description: Impacto del riesgo
   *                 example: "ALTO"
   *               owner:
   *                 type: string
   *                 description: Responsable del riesgo
   *                 example: "Carlos López"
   *                 maxLength: 100
   *               dueDate:
   *                 type: string
   *                 format: date
   *                 description: Fecha límite para mitigar el riesgo
   *                 example: "2024-02-15"
   *               description:
   *                 type: string
   *                 description: Descripción detallada del riesgo
   *                 example: "Posible falla del sistema principal que afecte las operaciones"
   *                 maxLength: 1000
   *               mitigation:
   *                 type: string
   *                 description: Plan de mitigación del riesgo
   *                 example: "Implementar sistema de respaldo"
   *                 maxLength: 1000
   *     responses:
   *       201:
   *         description: Riesgo creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Risk'
   *       400:
   *         description: Error de validación
   *       409:
   *         description: Conflicto - código ya existe
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const createRiskUseCase = container.resolve<CreateRiskUseCase>(RiskDependencyIdentifier.CreateRiskUseCase);
      const body = request.body as CreateRiskRequest;
      
      const result = await createRiskUseCase.execute(body);
      
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
