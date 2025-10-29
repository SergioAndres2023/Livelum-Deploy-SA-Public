import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { CreateIndicatorUseCase } from '../../../../src/indicators/application/useCases/CreateIndicatorUseCase';
import { CreateIndicatorRequest } from '../../../../src/indicators/application/dtos/CreateIndicatorRequest';

export class CreateIndicatorController {
  /**
   * @swagger
   * /api/indicators:
   *   post:
   *     tags:
   *       - indicators
   *     summary: Crear un nuevo indicador
   *     description: Crea un nuevo indicador con los datos proporcionados
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - code
   *               - category
   *               - type
   *               - currentValue
   *               - targetValue
   *               - unit
   *               - owner
   *               - frequency
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nombre del indicador
   *                 example: "Tasa de Satisfacción del Cliente"
   *               code:
   *                 type: string
   *                 description: Código único del indicador
   *                 example: "IND-001"
   *               category:
   *                 type: string
   *                 enum: [CALIDAD, OPERACIONES, PRODUCTIVIDAD, FINANCIERO, RECURSOS_HUMANOS, SEGURIDAD, MEDIO_AMBIENTE, SATISFACCION_CLIENTE]
   *                 description: Categoría del indicador
   *                 example: "SATISFACCION_CLIENTE"
   *               type:
   *                 type: string
   *                 enum: [PORCENTAJE, TIEMPO, NUMERICO, MONETARIO, RATIO, INDICE]
   *                 description: Tipo de indicador
   *                 example: "PORCENTAJE"
   *               currentValue:
   *                 type: number
   *                 description: Valor actual del indicador
   *                 example: 85.5
   *               targetValue:
   *                 type: number
   *                 description: Valor objetivo del indicador
   *                 example: 90.0
   *               unit:
   *                 type: string
   *                 description: Unidad de medida
   *                 example: "%"
   *               owner:
   *                 type: string
   *                 description: Responsable del indicador
   *                 example: "Juan Pérez"
   *               frequency:
   *                 type: string
   *                 enum: [DIARIO, SEMANAL, MENSUAL, TRIMESTRAL, SEMESTRAL, ANUAL]
   *                 description: Frecuencia de actualización
   *                 example: "MENSUAL"
   *               description:
   *                 type: string
   *                 description: Descripción del indicador
   *                 example: "Mide el nivel de satisfacción de los clientes con nuestros servicios"
   *     responses:
   *       201:
   *         description: Indicador creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Indicator'
   *       400:
   *         description: Error en los datos proporcionados
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   *       409:
   *         description: Ya existe un indicador con ese código
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   */
  async handle(request: FastifyRequest<{ Body: CreateIndicatorRequest }>, reply: FastifyReply) {
    try {
      const createIndicatorUseCase = container.resolve<CreateIndicatorUseCase>(
        IndicatorDependencyIdentifier.CreateIndicatorUseCase
      );

      const result = await createIndicatorUseCase.execute(request.body);

      return reply.status(201).send({
        success: true,
        data: result,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('Ya existe')) {
        return reply.status(409).send({
          success: false,
          error: 'Conflict',
          message: errorMessage,
        });
      }

      return reply.status(400).send({
        success: false,
        error: 'Bad Request',
        message: errorMessage,
      });
    }
  }
}
