import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { RiskDependencyIdentifier } from '../../../../src/risks/domain/dependencyIdentifier/RiskDependencyIdentifier';
import { GetRiskStatsUseCase } from '../../../../src/risks/application/useCases/GetRiskStatsUseCase';

export class GetRiskStatsController {

  /**
   * @swagger
   * /api/risks/stats:
   *   get:
   *     tags:
   *       - risks
   *     summary: Obtener estadísticas de riesgos
   *     description: Obtiene estadísticas completas de todos los riesgos en el sistema
   *     responses:
   *       200:
   *         description: Estadísticas de riesgos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 total:
   *                   type: integer
   *                   description: Total de riesgos
   *                   example: 18
   *                 byStatus:
   *                   type: object
   *                   description: Conteo por estado
   *                   properties:
   *                     ACTIVE:
   *                       type: integer
   *                       example: 5
   *                     MONITORED:
   *                       type: integer
   *                       example: 3
   *                     MITIGATED:
   *                       type: integer
   *                       example: 8
   *                     CLOSED:
   *                       type: integer
   *                       example: 2
   *                 byLevel:
   *                   type: object
   *                   description: Conteo por nivel de riesgo
   *                   properties:
   *                     BAJO:
   *                       type: integer
   *                       example: 4
   *                     MEDIO:
   *                       type: integer
   *                       example: 6
   *                     ALTO:
   *                       type: integer
   *                       example: 5
   *                     CRITICO:
   *                       type: integer
   *                       example: 3
   *                 byCategory:
   *                   type: object
   *                   description: Conteo por categoría
   *                   properties:
   *                     TECNOLOGICO:
   *                       type: integer
   *                       example: 8
   *                     RECURSOS_HUMANOS:
   *                       type: integer
   *                       example: 4
   *                     REGULATORIO:
   *                       type: integer
   *                       example: 3
   *                     OPERACIONAL:
   *                       type: integer
   *                       example: 2
   *                     FINANCIERO:
   *                       type: integer
   *                       example: 1
   *                 byProbability:
   *                   type: object
   *                   description: Conteo por probabilidad
   *                   properties:
   *                     BAJA:
   *                       type: integer
   *                       example: 6
   *                     MEDIA:
   *                       type: integer
   *                       example: 7
   *                     ALTA:
   *                       type: integer
   *                       example: 5
   *                 byImpact:
   *                   type: object
   *                   description: Conteo por impacto
   *                   properties:
   *                     BAJO:
   *                       type: integer
   *                       example: 4
   *                     MEDIO:
   *                       type: integer
   *                       example: 8
   *                     ALTO:
   *                       type: integer
   *                       example: 6
   *                 overdue:
   *                   type: integer
   *                   description: Riesgos vencidos
   *                   example: 2
   *                 critical:
   *                   type: integer
   *                   description: Riesgos críticos
   *                   example: 3
   *                 highRisk:
   *                   type: integer
   *                   description: Riesgos de alto nivel (ALTO + CRÍTICO)
   *                   example: 8
   *                 recent:
   *                   type: integer
   *                   description: Riesgos creados en los últimos 30 días
   *                   example: 5
   *                 dueSoon:
   *                   type: integer
   *                   description: Riesgos con fecha límite en los próximos 7 días
   *                   example: 3
   */
  async handle(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const getRiskStatsUseCase = container.resolve<GetRiskStatsUseCase>(RiskDependencyIdentifier.GetRiskStatsUseCase);
      const result = await getRiskStatsUseCase.execute();
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
