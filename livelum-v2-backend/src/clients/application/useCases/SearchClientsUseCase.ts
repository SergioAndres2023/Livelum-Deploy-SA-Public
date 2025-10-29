import { ClientRepository } from '../../domain/contracts/ClientRepository';
import { ClientSearchCriteria } from '../../domain/filters/ClientCriteriaMother';
import { ClientResponse } from '../dtos/ClientResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchClientsUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: Logger,
  ) {}

  async execute(criteria: ClientSearchCriteria): Promise<ClientResponse[]> {
    this.logger.debug('Buscando clientes con criterios', { criteria });

    try {
      const clients = await this.clientRepository.findByCriteria(criteria);

      this.logger.debug('Clientes encontrados', { 
        count: clients.length,
        criteria 
      });

      return clients.map(client => this.mapToResponse(client));
    } catch (error) {
      this.logger.error('Error al buscar clientes', { 
        error: (error as Error).message,
        criteria 
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
