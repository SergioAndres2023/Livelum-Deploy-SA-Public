import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { CompanyDependencyIdentifier } from '../../../../src/companies/domain/dependencyIdentifier/CompanyDependencyIdentifier';
import { CreateCompanyUseCase } from '../../../../src/companies/application/useCases/CreateCompanyUseCase';
import { CreateCompanyRequest } from '../../../../src/companies/application/dtos/CreateCompanyRequest';

/**
 * Request body interface for creating a new company
 * @interface CreateCompanyRequestBody
 */
interface CreateCompanyRequestBody {
  /** Legal business name */
  razonSocial: string;
  /** Trade name or brand name */
  nombreFantasia: string;
  /** Tax identification number (CUIT) */
  cuit: string;
  /** Company address (optional) */
  direccion?: string;
  /** City where the company is located (optional) */
  ciudad?: string;
  /** Province where the company is located (optional) */
  provincia?: string;
  /** Postal code (optional) */
  codigoPostal?: string;
  /** Company phone number (optional) */
  telefono?: string;
  /** Company email address (optional) */
  email?: string;
  /** Company website URL (optional) */
  website?: string;
  /** Company logo URL (optional) */
  logo?: string;
}

/**
 * Controller for handling company creation requests
 * @class CreateCompanyController
 */
export class CreateCompanyController {
  /**
   * Creates a new company
   * @description Creates a new company in the system with the provided information
   * @param {FastifyRequest<{ Body: CreateCompanyRequestBody }>} request - The HTTP request containing company data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * POST /api/companies
   * {
   *   "razonSocial": "Empresa Ejemplo S.A.",
   *   "nombreFantasia": "Empresa Ejemplo",
   *   "cuit": "30-12345678-9",
   *   "direccion": "Av. Principal 123",
   *   "ciudad": "Buenos Aires",
   *   "provincia": "Buenos Aires",
   *   "email": "contacto@empresa.com"
   * }
   * 
   * @throws {400} Bad Request - When validation fails or CUIT already exists
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Body: CreateCompanyRequestBody }>, reply: FastifyReply): Promise<void> {
    try {
      const createCompanyUseCase = container.resolve<CreateCompanyUseCase>(CompanyDependencyIdentifier.CreateCompanyUseCase);
      
      const companyRequest: CreateCompanyRequest = {
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

      const company = await createCompanyUseCase.execute(companyRequest);

      reply.status(201).send({
        success: true,
        data: company,
        message: 'Empresa creada exitosamente',
      });
    } catch (error) {
      reply.status(400).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al crear empresa',
      });
    }
  }
}

