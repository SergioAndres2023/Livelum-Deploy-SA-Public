import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { CreateClientUseCase } from '../../../../src/clients/application/useCases/CreateClientUseCase';
import { CreateClientRequest } from '../../../../src/clients/application/dtos/CreateClientRequest';
import { ClientType } from '../../../../src/clients/domain/enums/ClientEnums';

/**
 * Request body interface for creating a new client
 * @interface CreateClientRequestBody
 */
interface CreateClientRequestBody {
  /** Client's full name */
  name: string;
  /** Client's email address (must be unique) */
  email: string;
  /** Client's phone number (optional) */
  phone?: string;
  /** Client's NIF/Tax ID (optional) */
  nif?: string;
  /** Client's address (optional) */
  address?: string;
  /** Client type: INDIVIDUAL or COMPANY */
  type: ClientType;
}

/**
 * Controller for handling client creation requests
 * @class CreateClientController
 */
export class CreateClientController {
  /**
   * Creates a new client
   * @description Creates a new client in the system with the provided information
   * @param {FastifyRequest<{ Body: CreateClientRequestBody }>} request - The HTTP request containing client data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * POST /api/clients
   * {
   *   "name": "Juan Pérez",
   *   "email": "juan@example.com",
   *   "phone": "123456789",
   *   "address": "Calle Principal 123",
   *   "type": "INDIVIDUAL"
   * }
   * 
   * @throws {400} Bad Request - When validation fails
   * @throws {409} Conflict - When email already exists
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Body: CreateClientRequestBody }>, reply: FastifyReply): Promise<void> {
    try {
      const createClientUseCase = container.resolve<CreateClientUseCase>(DependencyIdentifier.CreateClientUseCase);
      
      const clientRequest: CreateClientRequest = {
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        nif: request.body.nif,
        address: request.body.address,
        type: request.body.type,
      };

      const client = await createClientUseCase.execute(clientRequest);

      reply.status(201).send({
        success: true,
        data: client,
        message: 'Cliente creado exitosamente',
      });
    } catch (error) {
      reply.status(400).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al crear cliente',
      });
    }
  }
}
