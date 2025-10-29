import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { FindCompanyByIdUseCase } from '../../../../src/companies/application/useCases/FindCompanyByIdUseCase';

/**
 * Request params interface for finding a company by ID
 * @interface FindCompanyByIdParams
 */
interface FindCompanyByIdParams {
  /** Company unique identifier */
  id: string;
}

/**
 * Controller for handling find company by ID requests
 * @class FindCompanyByIdController
 */
export class FindCompanyByIdController {
  /**
   * Finds a company by its ID
   * @description Retrieves a company's details using its unique identifier
   * @param {FastifyRequest<{ Params: FindCompanyByIdParams }>} request - The HTTP request containing the company ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * GET /api/companies/:id
   * 
   * @throws {404} Not Found - When company doesn't exist
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: FindCompanyByIdParams }>, reply: FastifyReply): Promise<void> {
    try {
      const findCompanyByIdUseCase = container.resolve<FindCompanyByIdUseCase>(CompanyDependencyIdentifier.FindCompanyByIdUseCase);
      
      const company = await findCompanyByIdUseCase.execute(request.params.id);

      if (!company) {
        reply.status(404).send({
          success: false,
          error: 'Empresa no encontrada',
          message: `No existe una empresa con el ID: ${request.params.id}`,
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
        message: 'Error al buscar empresa',
      });
    }
  }
}

