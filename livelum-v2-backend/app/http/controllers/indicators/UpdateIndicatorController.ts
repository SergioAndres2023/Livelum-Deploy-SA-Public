import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { UpdateIndicatorUseCase } from '../../../../src/indicators/application/useCases/UpdateIndicatorUseCase';
import { UpdateIndicatorRequest } from '../../../../src/indicators/application/dtos/UpdateIndicatorRequest';

export class UpdateIndicatorController {
  /**
   * @swagger
   * /api/indicators/{id}:
   *   put:
   *     tags:
   *       - indicators
   *     summary: Actualizar indicador
   *     description: Actualiza los datos de un indicador existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del indicador
   *         example: "65c7a1d0f7b1c2d3e4f5a6b7"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nombre del indicador
   *                 example: "Tasa de Satisfacción del Cliente Actualizada"
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
   *               targetValue:
   *                 type: number
   *                 description: Valor objetivo del indicador
   *                 example: 95.0
   *               unit:
   *                 type: string
   *                 description: Unidad de medida
   *                 example: "%"
   *               owner:
   *                 type: string
   *                 description: Responsable del indicador
   *                 example: "María García"
   *               frequency:
   *                 type: string
   *                 enum: [DIARIO, SEMANAL, MENSUAL, TRIMESTRAL, SEMESTRAL, ANUAL]
   *                 description: Frecuencia de actualización
   *                 example: "SEMANAL"
   *               description:
   *                 type: string
   *                 description: Descripción del indicador
   *                 example: "Mide el nivel de satisfacción de los clientes con nuestros servicios actualizado"
   *     responses:
   *       200:
   *         description: Indicador actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/definitions/Indicator'
   *       404:
   *         description: Indicador no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   *       400:
   *         description: Error en los datos proporcionados
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   */
  async handle(request: FastifyRequest<{ Params: { id: string }; Body: UpdateIndicatorRequest }>, reply: FastifyReply) {
    try {
      const updateIndicatorUseCase = container.resolve<UpdateIndicatorUseCase>(
        IndicatorDependencyIdentifier.UpdateIndicatorUseCase
      );

      const result = await updateIndicatorUseCase.execute(request.params.id, request.body);

      return reply.status(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        return reply.status(404).send({
          success: false,
          error: 'Not Found',
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
