import { ClientRepository } from '../../domain/contracts/ClientRepository';
import { ClientResponse } from '../dtos/ClientResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class FindClientByIdUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<ClientResponse | null> {
    this.logger.debug('Buscando cliente por ID', { clientId: id });

    try {
      const client = await this.clientRepository.findById(id);
      
      if (!client) {
        this.logger.debug('Cliente no encontrado', { clientId: id });
        return null;
      }

      this.logger.debug('Cliente encontrado', { 
        clientId: id, 
        email: client.email 
      });

      return this.mapToResponse(client);
    } catch (error) {
      this.logger.error('Error al buscar cliente por ID', { 
        error: (error as Error).message,
        clientId: id 
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
