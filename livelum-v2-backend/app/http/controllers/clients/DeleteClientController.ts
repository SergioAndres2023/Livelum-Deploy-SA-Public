import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DependencyIdentifier } from '../../../../src/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { DeleteClientUseCase } from '../../../../src/clients/application/useCases/DeleteClientUseCase';

/**
 * Request parameters interface for deleting a client
 * @interface DeleteClientParams
 */
interface DeleteClientParams {
  /** Client's unique identifier */
  id: string;
}

/**
 * Controller for handling client deletion requests
 * @class DeleteClientController
 */
export class DeleteClientController {
  /**
   * Deletes a client by ID
   * @description Permanently removes a client from the system using their unique identifier
   * @param {FastifyRequest<{ Params: DeleteClientParams }>} request - The HTTP request containing the client ID
   * @param {FastifyReply} reply - The HTTP response object
   * @returns {Promise<void>} Promise that resolves when the response is sent
   * 
   * @example
   * DELETE /api/clients/507f1f77bcf86cd799439011
   * 
   * @throws {404} Not Found - When client with the given ID doesn't exist
   * @throws {400} Bad Request - When ID format is invalid
   * @throws {500} Internal Server Error - When an unexpected error occurs
   */
  async handle(request: FastifyRequest<{ Params: DeleteClientParams }>, reply: FastifyReply): Promise<void> {
    try {
      const deleteClientUseCase = container.resolve<DeleteClientUseCase>(DependencyIdentifier.DeleteClientUseCase);
      
      await deleteClientUseCase.execute(request.params.id);

      reply.status(200).send({
        success: true,
        message: 'Cliente eliminado exitosamente',
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      
      if (errorMessage.includes('no encontrado')) {
        reply.status(404).send({
          success: false,
          error: errorMessage,
          message: 'Cliente no encontrado',
        });
      } else {
        reply.status(500).send({
          success: false,
          error: errorMessage,
          message: 'Error al eliminar cliente',
        });
      }
    }
  }
}
