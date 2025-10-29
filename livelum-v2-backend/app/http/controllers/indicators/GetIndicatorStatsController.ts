import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { GetIndicatorStatsUseCase } from '../../../../src/indicators/application/useCases/GetIndicatorStatsUseCase';

export class GetIndicatorStatsController {
  /**
   * @swagger
   * /api/indicators/stats:
   *   get:
   *     tags:
   *       - indicators
   *     summary: Obtener estadísticas de indicadores
   *     description: Obtiene estadísticas generales de todos los indicadores
   *     responses:
   *       200:
   *         description: Estadísticas obtenidas exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   properties:
   *                     total:
   *                       type: integer
   *                       description: Total de indicadores
   *                       example: 25
   *                     byStatus:
   *                       type: object
   *                       properties:
   *                         GOOD:
   *                           type: integer
   *                           example: 15
   *                         WARNING:
   *                           type: integer
   *                           example: 7
   *                         CRITICAL:
   *                           type: integer
   *                           example: 3
   *                     byType:
   *                       type: object
   *                       properties:
   *                         PORCENTAJE:
   *                           type: integer
   *                           example: 10
   *                         TIEMPO:
   *                           type: integer
   *                           example: 5
   *                         NUMERICO:
   *                           type: integer
   *                           example: 8
   *                         MONETARIO:
   *                           type: integer
   *                           example: 2
   *                     byCategory:
   *                       type: object
   *                       properties:
   *                         CALIDAD:
   *                           type: integer
   *                           example: 8
   *                         OPERACIONES:
   *                           type: integer
   *                           example: 6
   *                         PRODUCTIVIDAD:
   *                           type: integer
   *                           example: 4
   *                         FINANCIERO:
   *                           type: integer
   *                           example: 3
   *                         RECURSOS_HUMANOS:
   *                           type: integer
   *                           example: 2
   *                         SEGURIDAD:
   *                           type: integer
   *                           example: 1
   *                         MEDIO_AMBIENTE:
   *                           type: integer
   *                           example: 1
   *                         SATISFACCION_CLIENTE:
   *                           type: integer
   *                           example: 0
   *                     critical:
   *                       type: integer
   *                       description: Indicadores críticos
   *                       example: 3
   *                     warning:
   *                       type: integer
   *                       description: Indicadores en advertencia
   *                       example: 7
   *                     good:
   *                       type: integer
   *                       description: Indicadores en buen estado
   *                       example: 15
   *                     aboveTarget:
   *                       type: integer
   *                       description: Indicadores por encima del objetivo
   *                       example: 12
   *                     belowTarget:
   *                       type: integer
   *                       description: Indicadores por debajo del objetivo
   *                       example: 8
   *                     onTarget:
   *                       type: integer
   *                       description: Indicadores en el objetivo
   *                       example: 5
   *                     recent:
   *                       type: integer
   *                       description: Indicadores actualizados en los últimos 30 días
   *                       example: 20
   *                     needsUpdate:
   *                       type: integer
   *                       description: Indicadores que necesitan actualización (no actualizados en 7 días)
   *                       example: 3
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ErrorResponse'
   */
  async handle(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const getIndicatorStatsUseCase = container.resolve<GetIndicatorStatsUseCase>(
        IndicatorDependencyIdentifier.GetIndicatorStatsUseCase
      );

      const result = await getIndicatorStatsUseCase.execute();

      return reply.status(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Internal Server Error',
        message: (error as Error).message,
      });
    }
  }
}
