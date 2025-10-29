import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { DeleteCompanyUseCase } from '../../../../src/companies/application/useCases/DeleteCompanyUseCase';

/**
 * Request params interface for deleting a company
 * @interface DeleteCompanyParams
 */
interface DeleteCompanyParams {
  /** Company unique identifier */
  id: string;
}

/**
 * Controller for handling company deletion requests
 * @class DeleteCompanyController
 */
export class DeleteCompanyController {
  /**
   * Deletes a company
   * @description Permanently removes a company from the system
   * @param {FastifyRequest<{ Params: DeleteCompanyParams }>} request - The HTTP request containing the company ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * DELETE /api/companies/:id
   * 
   * @throws {404} Not Found - When company doesn't exist
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: DeleteCompanyParams }>, reply: FastifyReply): Promise<void> {
    try {
      const deleteCompanyUseCase = container.resolve<DeleteCompanyUseCase>(CompanyDependencyIdentifier.DeleteCompanyUseCase);
      
      await deleteCompanyUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        message: 'Empresa eliminada exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      const statusCode = errorMessage.includes('no encontrada') ? 404 : 500;
      
      reply.status(statusCode).send({
        success: false,
        error: errorMessage,
        message: 'Error al eliminar empresa',
      });
    }
  }
}

