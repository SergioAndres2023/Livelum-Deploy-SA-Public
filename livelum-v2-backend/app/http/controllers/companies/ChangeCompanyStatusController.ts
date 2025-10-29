import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { ChangeCompanyStatusUseCase } from '../../../../src/companies/application/useCases/ChangeCompanyStatusUseCase';
import { CompanyStatus } from '../../../../src/companies/domain/enums/CompanyEnums';

/**
 * Request params interface
 * @interface ChangeCompanyStatusParams
 */
interface ChangeCompanyStatusParams {
  /** Company unique identifier */
  id: string;
}

/**
 * Request body interface for changing company status
 * @interface ChangeCompanyStatusRequestBody
 */
interface ChangeCompanyStatusRequestBody {
  /** New status for the company */
  status: CompanyStatus;
}

/**
 * Controller for handling company status change requests
 * @class ChangeCompanyStatusController
 */
export class ChangeCompanyStatusController {
  /**
   * Changes a company's status
   * @description Updates the status of a company (ACTIVE, INACTIVE, SUSPENDED)
   * @param {FastifyRequest<{ Params: ChangeCompanyStatusParams; Body: ChangeCompanyStatusRequestBody }>} request - The HTTP request
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * PATCH /api/companies/:id/status
   * {
   *   "status": "INACTIVE"
   * }
   * 
   * @throws {400} Bad Request - When validation fails
   * @throws {404} Not Found - When company doesn't exist
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{ Params: ChangeCompanyStatusParams; Body: ChangeCompanyStatusRequestBody }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const changeCompanyStatusUseCase = container.resolve<ChangeCompanyStatusUseCase>(CompanyDependencyIdentifier.ChangeCompanyStatusUseCase);
      
      const company = await changeCompanyStatusUseCase.execute(request.params.id, request.body.status);

      reply.status(200).send({
        success: true,
        data: company,
        message: 'Estado de empresa actualizado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      const statusCode = errorMessage.includes('no encontrada') ? 404 : 400;
      
      reply.status(statusCode).send({
        success: false,
        error: errorMessage,
        message: 'Error al cambiar estado de empresa',
      });
    }
  }
}

