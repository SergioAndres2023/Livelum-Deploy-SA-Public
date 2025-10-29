import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { FindClientByIdUseCase } from '../../../../src/clients/application/useCases/FindClientByIdUseCase';

/**
 * Request parameters interface for finding a client by ID
 * @interface FindClientParams
 */
interface FindClientParams {
  /** Client's unique identifier */
  id: string;
}

/**
 * Controller for handling client retrieval requests
 * @class FindClientController
 */
export class FindClientController {
  /**
   * Finds a client by ID
   * @description Retrieves a specific client from the system using their unique identifier
   * @param {FastifyRequest<{ Params: FindClientParams }>} request - The HTTP request containing the client ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * GET /api/clients/507f1f77bcf86cd799439011
   * 
   * @throws {404} Not Found - When client with the given ID doesn't exist
   * @throws {400} Bad Request - When ID format is invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: FindClientParams }>, reply: FastifyReply): Promise<void> {
    try {
      const findClientUseCase = container.resolve<FindClientByIdUseCase>(DependencyIdentifier.FindClientByIdUseCase);
      
      const client = await findClientUseCase.execute(request.params.id);

      if (!client) {
        reply.status(404).send({
          success: false,
          message: 'Cliente no encontrado',
        });
        return;
      }

      reply.status(200).send({
        success: true,
        data: client,
        message: 'Cliente encontrado exitosamente',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: (error as Error).message,
        message: 'Error al buscar cliente',
      });
    }
  }
}
