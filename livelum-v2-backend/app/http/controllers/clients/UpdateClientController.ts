import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { UpdateClientUseCase } from '../../../../src/clients/application/useCases/UpdateClientUseCase';
import { UpdateClientRequest } from '../../../../src/clients/application/dtos/UpdateClientRequest';
import { ClientType } from '../../../../src/clients/domain/enums/ClientEnums';

/**
 * Request parameters interface for updating a client
 * @interface UpdateClientParams
 */
interface UpdateClientParams {
  /** Client's unique identifier */
  id: string;
}

/**
 * Request body interface for updating a client
 * @interface UpdateClientRequestBody
 */
interface UpdateClientRequestBody {
  /** Client's full name (optional) */
  name?: string;
  /** Client's email address (optional) */
  email?: string;
  /** Client's phone number (optional) */
  phone?: string;
  /** Client's NIF/Tax ID (optional) */
  nif?: string;
  /** Client's address (optional) */
  address?: string;
  /** Client type (optional) */
  type?: ClientType;
}

/**
 * Controller for handling client update requests
 * @class UpdateClientController
 */
export class UpdateClientController {
  /**
   * Updates an existing client
   * @description Updates an existing client's information with the provided data
   * @param {FastifyRequest<{ Params: UpdateClientParams; Body: UpdateClientRequestBody }>} request - The HTTP request containing client ID and update data
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * PUT /api/clients/507f1f77bcf86cd799439011
   * {
   *   "name": "Juan Pérez Actualizado",
   *   "phone": "987654321",
   *   "address": "Nueva Dirección 456"
   * }
   * 
   * @throws {404} Not Found - When client with the given ID doesn't exist
   * @throws {409} Conflict - When email already exists for another client
   * @throws {400} Bad Request - When validation fails
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(
    request: FastifyRequest<{ 
      Params: UpdateClientParams; 
      Body: UpdateClientRequestBody 
    }>, 
    reply: FastifyReply
  ): Promise<void> {
    try {
      const updateClientUseCase = container.resolve<UpdateClientUseCase>(DependencyIdentifier.UpdateClientUseCase);
      
      const updateRequest: UpdateClientRequest = {
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        nif: request.body.nif,
        address: request.body.address,
        type: request.body.type,
      };

      const client = await updateClientUseCase.execute(request.params.id, updateRequest);

      reply.status(200).send({
        success: true,
        data: client,
        message: 'Cliente actualizado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Cliente no encontrado',
        });
      } else if (errorMessage.includes('Ya existe')) {
        reply.status(409).send({
          success: false,
          error: errorMessage,
          message: 'Conflicto al actualizar cliente',
        });
      } else {
        reply.status(400).send({
          success: false,
          error: errorMessage,
          message: 'Error al actualizar cliente',
        });
      }
    }
  }
}
