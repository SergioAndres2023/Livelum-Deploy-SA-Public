import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { SearchCompaniesUseCase } from '../../../../src/companies/application/useCases/SearchCompaniesUseCase';
import { SearchCompaniesRequest } from '../../../../src/companies/application/dtos/SearchCompaniesRequest';
import { CompanyStatus } from '../../../../src/companies/domain/enums/CompanyEnums';

/**
 * Query string interface for searching companies
 * @interface SearchCompaniesQuery
 */
interface SearchCompaniesQuery {
  razonSocial?: string;
  nombreFantasia?: string;
  cuit?: string;
  ciudad?: string;
  provincia?: string;
  status?: CompanyStatus;
  page?: string;
  limit?: string;
  sortBy?: 'razonSocial' | 'nombreFantasia' | 'cuit' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Controller for handling company search requests
 * @class SearchCompaniesController
 */
export class SearchCompaniesController {
  /**
   * Searches companies based on criteria
   * @description Retrieves a list of companies that match the search criteria
   * @param {FastifyRequest<{ Querystring: SearchCompaniesQuery }>} request - The HTTP request containing search parameters
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * GET /api/companies?razonSocial=Empresa&status=ACTIVE&page=1&limit=10
   * 
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Querystring: SearchCompaniesQuery }>, reply: FastifyReply): Promise<void> {
    try {
      const searchCompaniesUseCase = container.resolve<SearchCompaniesUseCase>(CompanyDependencyIdentifier.SearchCompaniesUseCase);
      
      const searchRequest: SearchCompaniesRequest = {
        razonSocial: request.query.razonSocial,
        nombreFantasia: request.query.nombreFantasia,
        cuit: request.query.cuit,
        ciudad: request.query.ciudad,
        provincia: request.query.provincia,
        status: request.query.status,
        page: request.query.page ? parseInt(request.query.page, 10) : undefined,
        limit: request.query.limit ? parseInt(request.query.limit, 10) : undefined,
        sortBy: request.query.sortBy,
        sortOrder: request.query.sortOrder,
      };

      const companies = await searchCompaniesUseCase.execute(searchRequest);

      reply.status(200).send({
        success: true,
        data: companies,
        total: companies.length,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar empresas',
      });
    }
  }
}

