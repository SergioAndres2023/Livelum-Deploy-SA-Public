import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { SearchRisksUseCase } from '../../../../src/risks/application/useCases/SearchRisksUseCase';
import { SearchRisksRequest } from '../../../../src/risks/application/dtos/SearchRisksRequest';

export class SearchRisksController {

  /**
   * @swagger
   * /api/risks:
   *   get:
   *     tags:
   *       - risks
   *     summary: Buscar riesgos
   *     description: Busca riesgos con filtros opcionales y paginación
   *     parameters:
   *       - in: query
   *         name: title
   *         schema:
   *           type: string
   *         description: Filtrar por título (búsqueda parcial)
   *       - in: query
   *         name: code
   *         schema:
   *           type: string
   *         description: Filtrar por código (búsqueda parcial)
   *       - in: query
   *         name: category
   *         schema:
   *           type: string
   *           enum: [TECNOLOGICO, RECURSOS_HUMANOS, REGULATORIO, OPERACIONAL, FINANCIERO, ESTRATEGICO, COMPLIANCE, SEGURIDAD]
   *         description: Filtrar por categoría
   *       - in: query
   *         name: probability
   *         schema:
   *           type: string
   *           enum: [BAJA, MEDIA, ALTA]
   *         description: Filtrar por probabilidad
   *       - in: query
   *         name: impact
   *         schema:
   *           type: string
   *           enum: [BAJO, MEDIO, ALTO]
   *         description: Filtrar por impacto
   *       - in: query
   *         name: riskLevel
   *         schema:
   *           type: string
   *           enum: [BAJO, MEDIO, ALTO, CRITICO]
   *         description: Filtrar por nivel de riesgo
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [ACTIVE, MONITORED, MITIGATED, CLOSED]
   *         description: Filtrar por estado
   *       - in: query
   *         name: owner
   *         schema:
   *           type: string
   *         description: Filtrar por responsable (búsqueda parcial)
   *       - in: query
   *         name: isOverdue
   *         schema:
   *           type: boolean
   *         description: Filtrar solo riesgos vencidos
   *       - in: query
   *         name: isCritical
   *         schema:
   *           type: boolean
   *         description: Filtrar solo riesgos críticos
   *       - in: query
   *         name: dueDateFrom
   *         schema:
   *           type: string
   *           format: date
   *         description: Filtrar por fecha límite desde
   *       - in: query
   *         name: dueDateTo
   *         schema:
   *           type: string
   *           format: date
   *         description: Filtrar por fecha límite hasta
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Número de página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *         description: Elementos por página
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *           enum: [title, code, riskLevel, dueDate, createdAt, updatedAt]
   *         description: Campo para ordenar
   *       - in: query
   *         name: sortOrder
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *         description: Orden de clasificación
   *     responses:
   *       200:
   *         description: Lista de riesgos encontrados
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Risk'
   */
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const query = request.query as any;
      
      // Convertir parámetros de query a tipos correctos
      const searchRequest: SearchRisksRequest = {
        title: query.title,
        code: query.code,
        category: query.category,
        probability: query.probability,
        impact: query.impact,
        riskLevel: query.riskLevel,
        status: query.status,
        owner: query.owner,
        isOverdue: query.isOverdue === 'true',
        isCritical: query.isCritical === 'true',
        dueDateFrom: query.dueDateFrom ? new Date(query.dueDateFrom) : undefined,
        dueDateTo: query.dueDateTo ? new Date(query.dueDateTo) : undefined,
        createdAtFrom: query.createdAtFrom ? new Date(query.createdAtFrom) : undefined,
        createdAtTo: query.createdAtTo ? new Date(query.createdAtTo) : undefined,
        page: query.page ? parseInt(query.page) : undefined,
        limit: query.limit ? parseInt(query.limit) : undefined,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      };

      const searchRisksUseCase = container.resolve<SearchRisksUseCase>(RiskDependencyIdentifier.SearchRisksUseCase);
      const result = await searchRisksUseCase.execute(searchRequest);
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
