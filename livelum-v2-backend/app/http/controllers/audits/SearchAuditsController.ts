import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { SearchAuditsUseCase } from '../../../../src/audits/application/useCases/SearchAuditsUseCase';
import { AuditSearchCriteriaBuilder } from '../../../../src/audits/domain/filters/AuditCriteriaMother';
import { AuditStatus, AuditType } from '../../../../src/audits/domain/enums/AuditEnums';

/**
 * Query parameters interface for searching audits
 * @interface SearchAuditsQuery
 */
interface SearchAuditsQuery {
  /** Filter by title (partial match) */
  title?: string;
  /** Filter by audit type */
  auditType?: AuditType;
  /** Filter by audit status */
  status?: AuditStatus;
  /** Filter by auditor name (partial match) */
  auditorName?: string;
  /** Filter for upcoming audits */
  upcoming?: 'true' | 'false';
  /** Filter for overdue audits */
  overdue?: 'true' | 'false';
  /** Filter for completed audits */
  completed?: 'true' | 'false';
  /** Filter by date range start */
  dateFrom?: string;
  /** Filter by date range end */
  dateTo?: string;
  /** Page number for pagination */
  page?: string;
  /** Number of items per page */
  limit?: string;
  /** Field to sort by */
  sortBy?: 'title' | 'auditType' | 'status' | 'auditorName' | 'plannedDate' | 'actualDate' | 'createdAt' | 'updatedAt';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Controller for handling audit search requests
 * @class SearchAuditsController
 */
export class SearchAuditsController {
  /**
   * Searches for audits based on provided criteria
   * @description Searches and filters audits based on various criteria including title, type, status, auditor, and date ranges
   * @param {FastifyRequest<{ Querystring: SearchAuditsQuery }>} request - The HTTP request containing search parameters
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * GET /api/audits?title=auditoría&status=PLANNED&page=1&limit=10
   * GET /api/audits?upcoming=true&sortBy=plannedDate&sortOrder=asc
   * GET /api/audits?auditType=INTERNAL&dateFrom=2024-01-01&dateTo=2024-12-31
   *
   * @throws {400} Bad Request - When query parameters are invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Querystring: SearchAuditsQuery }>, reply: FastifyReply): Promise<void> {
    try {
      const searchAuditsUseCase = container.resolve<SearchAuditsUseCase>(DependencyIdentifier.SearchAuditsUseCase);

      const builder = AuditSearchCriteriaBuilder.create();

      // Apply filters
      if (request.query.title) {
        builder.byTitle(request.query.title);
      }
      if (request.query.auditType) {
        builder.byType(request.query.auditType);
      }
      if (request.query.status) {
        builder.byStatus(request.query.status);
      }
      if (request.query.auditorName) {
        builder.byAuditor(request.query.auditorName);
      }
      if (request.query.upcoming === 'true') {
        builder.upcoming();
      }
      if (request.query.overdue === 'true') {
        builder.overdue();
      }
      if (request.query.completed === 'true') {
        builder.completed();
      }
      if (request.query.dateFrom && request.query.dateTo) {
        builder.byDateRange(new Date(request.query.dateFrom), new Date(request.query.dateTo));
      }

      // Apply pagination
      const page = parseInt(request.query.page || '1', 10);
      const limit = parseInt(request.query.limit || '10', 10);
      builder.withPagination(page, limit);

      // Apply sorting
      if (request.query.sortBy && request.query.sortOrder) {
        builder.withSorting(request.query.sortBy, request.query.sortOrder);
      } else {
        builder.withSorting('plannedDate', 'asc');
      }

      const criteria = builder.build();
      const audits = await searchAuditsUseCase.execute(criteria);

      reply.status(200).send({
        success: true,
        data: audits,
        pagination: {
          page,
          limit,
          total: audits.length,
        },
        message: 'Auditorías encontradas exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar auditorías',
      });
    }
  }
}
