import { ClientRepository } from '../../domain/contracts/ClientRepository';
import { UpdateClientRequest } from '../dtos/UpdateClientRequest';
import { ClientResponse } from '../dtos/ClientResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateClientRequest): Promise<ClientResponse> {
    this.logger.info('Actualizando cliente', { clientId: id, updates: request });

    try {
      // Buscar el cliente existente
      const existingClient = await this.clientRepository.findById(id);
      if (!existingClient) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
      }

      // Si se está actualizando el email, verificar que no exista otro cliente con ese email
      if (request.email && request.email !== existingClient.email) {
        const clientWithEmail = await this.clientRepository.findByEmail(request.email);
        if (clientWithEmail && clientWithEmail.id !== id) {
          throw new Error(`Ya existe otro cliente con el email: ${request.email}`);
        }
      }

      // Actualizar la información del cliente
      existingClient.updateInfo(request);

      // Guardar los cambios
      await this.clientRepository.update(existingClient);

      this.logger.info('Cliente actualizado exitosamente', { 
        clientId: id, 
        email: existingClient.email 
      });

      return this.mapToResponse(existingClient);
    } catch (error) {
      this.logger.error('Error al actualizar cliente', { 
        error: (error as Error).message,
        clientId: id,
        request 
      });
      throw error;
    }
  }

  private mapToResponse(client: any): ClientResponse {
    const primitives = client.toPrimitives();
    return {
      id: primitives.id,
      name: primitives.name,
      email: primitives.email,
      phone: primitives.phone,
      nif: primitives.nif,
      address: primitives.address,
      type: primitives.type,
      status: primitives.status,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
