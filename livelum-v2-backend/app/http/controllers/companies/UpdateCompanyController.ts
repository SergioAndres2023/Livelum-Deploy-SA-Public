import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { UpdateCompanyUseCase } from '../../../../src/companies/application/useCases/UpdateCompanyUseCase';
import { UpdateCompanyRequest } from '../../../../src/companies/application/dtos/UpdateCompanyRequest';

/**
 * Request params interface
 * @interface UpdateCompanyParams
 */
interface UpdateCompanyParams {
  /** Company unique identifier */
  id: string;
}

/**
 * Request body interface for updating a company
 * @interface UpdateCompanyRequestBody
 */
interface UpdateCompanyRequestBody {
  razonSocial?: string;
  nombreFantasia?: string;
  cuit?: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  website?: string;
  logo?: string;
}

/**
 * Controller for handling company update requests
 * @class UpdateCompanyController
 */
export class UpdateCompanyController {
  /**
   * Updates a company
   * @description Updates an existing company's information
   * @param {FastifyRequest<{ Params: UpdateCompanyParams; Body: UpdateCompanyRequestBody }>} request - The HTTP request
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * PUT /api/companies/:id
   * {
   *   "nombreFantasia": "Nuevo Nombre",
   *   "telefono": "123456789"
   * }
   * 
   * @throws {400} Bad Request - When validation fails
   * @throws {404} Not Found - When company doesn't exist
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{ Params: UpdateCompanyParams; Body: UpdateCompanyRequestBody }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const updateCompanyUseCase = container.resolve<UpdateCompanyUseCase>(CompanyDependencyIdentifier.UpdateCompanyUseCase);
      
      const updateRequest: UpdateCompanyRequest = {
        razonSocial: request.body.razonSocial,
        nombreFantasia: request.body.nombreFantasia,
        cuit: request.body.cuit,
        direccion: request.body.direccion,
        ciudad: request.body.ciudad,
        provincia: request.body.provincia,
        codigoPostal: request.body.codigoPostal,
        telefono: request.body.telefono,
        email: request.body.email,
        website: request.body.website,
        logo: request.body.logo,
      };

      const company = await updateCompanyUseCase.execute(request.params.id, updateRequest);

      reply.status(200).send({
        success: true,
        data: company,
        message: 'Empresa actualizada exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      const statusCode = errorMessage.includes('no encontrada') ? 404 : 400;
      
      reply.status(statusCode).send({
        success: false,
        error: errorMessage,
        message: 'Error al actualizar empresa',
      });
    }
  }
}

