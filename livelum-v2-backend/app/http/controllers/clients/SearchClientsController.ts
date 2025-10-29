import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { SearchClientsUseCase } from '../../../../src/clients/application/useCases/SearchClientsUseCase';
import { ClientSearchCriteriaBuilder } from '../../../../src/clients/domain/filters/ClientCriteriaMother';
import { ClientType, ClientStatus } from '../../../../src/clients/domain/enums/ClientEnums';

/**
 * Query parameters interface for searching clients
 * @interface SearchClientsQuery
 */
interface SearchClientsQuery {
  /** Filter by client name (partial match) */
  name?: string;
  /** Filter by client email (partial match) */
  email?: string;
  /** Filter by client phone number */
  phone?: string;
  /** Filter by client NIF/Tax ID */
  nif?: string;
  /** Filter by client type */
  type?: ClientType;
  /** Filter by client status */
  status?: ClientStatus;
  /** Page number for pagination (default: 1) */
  page?: string;
  /** Number of items per page (default: 10) */
  limit?: string;
  /** Field to sort by */
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Controller for handling client search requests
 * @class SearchClientsController
 */
export class SearchClientsController {
  /**
   * Searches clients with filters and pagination
   * @description Searches for clients using various filters and returns paginated results
   * @param {FastifyRequest<{ Querystring: SearchClientsQuery }>} request - The HTTP request containing search parameters
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * GET /api/clients?name=Juan&type=INDIVIDUAL&page=1&limit=10&sortBy=name&sortOrder=asc
   * 
   * @throws {400} Bad Request - When query parameters are invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Querystring: SearchClientsQuery }>, reply: FastifyReply): Promise<void> {
    try {
      const searchClientsUseCase = container.resolve<SearchClientsUseCase>(DependencyIdentifier.SearchClientsUseCase);
      
      // Construir criterios de búsqueda
      const builder = ClientSearchCriteriaBuilder.create();

      if (request.query.name) {
        builder.withName(request.query.name);
      }
      if (request.query.email) {
        builder.withEmail(request.query.email);
      }
      if (request.query.phone) {
        builder.withPhone(request.query.phone);
      }
      if (request.query.nif) {
        builder.withNif(request.query.nif);
      }
      if (request.query.type) {
        builder.withType(request.query.type);
      }
      if (request.query.status) {
        builder.withStatus(request.query.status);
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
      const clients = await searchClientsUseCase.execute(criteria);

      reply.status(200).send({
        success: true,
        data: clients,
        pagination: {
          page,
          limit,
          total: clients.length,
        },
        message: 'Clientes encontrados exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar clientes',
      });
    }
  }
}
