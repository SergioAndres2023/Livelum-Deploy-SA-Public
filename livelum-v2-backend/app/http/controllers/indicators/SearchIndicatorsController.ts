import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { IndicatorDependencyIdentifier } from '../../../../src/indicators/domain/dependencyIdentifier/IndicatorDependencyIdentifier';
import { SearchIndicatorsUseCase } from '../../../../src/indicators/application/useCases/SearchIndicatorsUseCase';
import { SearchIndicatorsRequest } from '../../../../src/indicators/application/dtos/SearchIndicatorsRequest';

export class SearchIndicatorsController {
  /**
   * @swagger
   * /api/indicators:
   *   get:
   *     tags:
   *       - indicators
   *     summary: Buscar indicadores
   *     description: Busca indicadores con filtros opcionales y paginación
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Filtrar por nombre (búsqueda parcial)
   *         example: "satisfacción"
   *       - in: query
   *         name: code
   *         schema:
   *           type: string
   *         description: Filtrar por código (búsqueda parcial)
   *         example: "IND"
   *       - in: query
   *         name: category
   *         schema:
   *           type: string
   *           enum: [CALIDAD, OPERACIONES, PRODUCTIVIDAD, FINANCIERO, RECURSOS_HUMANOS, SEGURIDAD, MEDIO_AMBIENTE, SATISFACCION_CLIENTE]
   *         description: Filtrar por categoría
   *         example: "SATISFACCION_CLIENTE"
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [PORCENTAJE, TIEMPO, NUMERICO, MONETARIO, RATIO, INDICE]
   *         description: Filtrar por tipo
   *         example: "PORCENTAJE"
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [GOOD, WARNING, CRITICAL]
   *         description: Filtrar por estado
   *         example: "WARNING"
   *       - in: query
   *         name: owner
   *         schema:
   *           type: string
   *         description: Filtrar por responsable (búsqueda parcial)
   *         example: "Juan"
   *       - in: query
   *         name: isCritical
   *         schema:
   *           type: boolean
   *         description: Filtrar solo indicadores críticos
   *         example: true
   *       - in: query
   *         name: isWarning
   *         schema:
   *           type: boolean
   *         description: Filtrar solo indicadores en advertencia
   *         example: false
   *       - in: query
   *         name: isGood
   *         schema:
   *           type: boolean
   *         description: Filtrar solo indicadores en buen estado
   *         example: false
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Número de página
   *         example: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *         description: Número de elementos por página
   *         example: 10
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *           enum: [name, code, currentValue, targetValue, lastUpdate, createdAt, updatedAt]
   *         description: Campo por el cual ordenar
   *         example: "lastUpdate"
   *       - in: query
   *         name: sortOrder
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *         description: Orden de clasificación
   *         example: "desc"
   *     responses:
   *       200:
   *         description: Lista de indicadores encontrados
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/definitions/Indicator'
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     page:
   *                       type: integer
   *                       example: 1
   *                     limit:
   *                       type: integer
   *                       example: 10
   *                     total:
   *                       type: integer
   *                       example: 25
   */
  async handle(request: FastifyRequest<{ Querystring: SearchIndicatorsRequest }>, reply: FastifyReply) {
    try {
      const searchIndicatorsUseCase = container.resolve<SearchIndicatorsUseCase>(
        IndicatorDependencyIdentifier.SearchIndicatorsUseCase
      );

      const result = await searchIndicatorsUseCase.execute(request.query);

      return reply.status(200).send({
        success: true,
        data: result,
        pagination: {
          page: request.query.page || 1,
          limit: request.query.limit || 10,
          total: result.length,
        },
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
