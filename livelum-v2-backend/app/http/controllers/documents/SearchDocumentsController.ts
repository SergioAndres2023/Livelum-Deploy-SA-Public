import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { SearchDocumentsUseCase } from '../../../../src/documents/application/useCases/SearchDocumentsUseCase';
import { DocumentSearchCriteriaBuilder } from '../../../../src/documents/domain/filters/DocumentCriteriaMother';
import { DocumentType, DocumentStatus } from '../../../../src/documents/domain/enums/DocumentEnums';

/**
 * Query parameters interface for searching documents
 * @interface SearchDocumentsQuery
 */
interface SearchDocumentsQuery {
  /** Filter by document title (partial match) */
  title?: string;
  /** Filter by document code (partial match) */
  code?: string;
  /** Filter by document type */
  type?: DocumentType;
  /** Filter by document status */
  status?: DocumentStatus;
  /** Filter by document author */
  author?: string;
  /** Filter for expiring soon documents */
  expiringSoon?: string;
  /** Filter for expired documents */
  expired?: string;
  /** Page number for pagination (default: 1) */
  page?: string;
  /** Number of items per page (default: 10) */
  limit?: string;
  /** Field to sort by */
  sortBy?: 'title' | 'code' | 'createdDate' | 'expiryDate' | 'createdAt' | 'updatedAt';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Controller for handling document search requests
 * @class SearchDocumentsController
 */
export class SearchDocumentsController {
  /**
   * Searches documents with filters and pagination
   * @description Searches for documents using various filters and returns paginated results
   * @param {FastifyRequest<{ Querystring: SearchDocumentsQuery }>} request - The HTTP request containing search parameters
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   *
   * @example
   * GET /api/documents?title=Manual&type=MANUAL&status=APROBADO&page=1&limit=10&sortBy=createdAt&sortOrder=desc
   *
   * @throws {400} Bad Request - When query parameters are invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Querystring: SearchDocumentsQuery }>, reply: FastifyReply): Promise<void> {
    try {
      const searchDocumentsUseCase = container.resolve<SearchDocumentsUseCase>(DependencyIdentifier.SearchDocumentsUseCase);

      // Construir criterios de búsqueda
      const builder = DocumentSearchCriteriaBuilder.create();

      if (request.query.title) {
        builder.byTitle(request.query.title);
      }
      if (request.query.code) {
        builder.byCode(request.query.code);
      }
      if (request.query.type) {
        builder.byType(request.query.type);
      }
      if (request.query.status) {
        builder.byStatus(request.query.status);
      }
      if (request.query.author) {
        builder.byAuthor(request.query.author);
      }
      if (request.query.expiringSoon === 'true') {
        builder.expiringSoon();
      }
      if (request.query.expired === 'true') {
        builder.expired();
      }

      // Paginación
      const page = parseInt(request.query.page || '1', 10);
      const limit = parseInt(request.query.limit || '10', 10);
      builder.withPagination(page, limit);

      // Ordenamiento
      if (request.query.sortBy && request.query.sortOrder) {
        builder.withSorting(request.query.sortBy, request.query.sortOrder);
      } else {
        builder.withSorting('createdAt', 'desc');
      }

      const criteria = builder.build();
      const documents = await searchDocumentsUseCase.execute(criteria);

      reply.status(200).send({
        success: true,
        data: documents,
        pagination: {
          page,
          limit,
          total: documents.length,
        },
        message: 'Documentos encontrados exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar documentos',
      });
    }
  }
}
