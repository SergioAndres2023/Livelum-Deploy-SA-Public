import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { FindCompanyByCuitUseCase } from '../../../../src/companies/application/useCases/FindCompanyByCuitUseCase';

/**
 * Query string interface for finding a company by CUIT
 * @interface FindCompanyByCuitQuery
 */
interface FindCompanyByCuitQuery {
  /** Tax identification number (CUIT) */
  cuit: string;
}

/**
 * Controller for handling find company by CUIT requests
 * @class FindCompanyByCuitController
 */
export class FindCompanyByCuitController {
  /**
   * Finds a company by its CUIT
   * @description Retrieves a company's details using its tax identification number
   * @param {FastifyRequest<{ Querystring: FindCompanyByCuitQuery }>} request - The HTTP request containing the CUIT
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * GET /api/companies/by-cuit?cuit=30-12345678-9
   * 
   * @throws {404} Not Found - When company doesn't exist
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Querystring: FindCompanyByCuitQuery }>, reply: FastifyReply): Promise<void> {
    try {
      const findCompanyByCuitUseCase = container.resolve<FindCompanyByCuitUseCase>(CompanyDependencyIdentifier.FindCompanyByCuitUseCase);
      
      const company = await findCompanyByCuitUseCase.execute(request.query.cuit);

      if (!company) {
        reply.status(404).send({
          success: false,
          error: 'Empresa no encontrada',
          message: `No existe una empresa con el CUIT: ${request.query.cuit}`,
        });
        return;
      }

      reply.status(200).send({
        success: true,
        data: company,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar empresa por CUIT',
      });
    }
  }
}

