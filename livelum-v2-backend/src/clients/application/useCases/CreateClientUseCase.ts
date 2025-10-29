import { Client } from '../../domain/entities/Client';
import { ClientRepository } from '../../domain/contracts/ClientRepository';
import { CreateClientRequest } from '../dtos/CreateClientRequest';
import { ClientResponse } from '../dtos/ClientResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateClientRequest): Promise<ClientResponse> {
    this.logger.info('Creando nuevo cliente', { email: request.email });

    // Verificar si ya existe un cliente con el mismo email
    const existingClient = await this.clientRepository.findByEmail(request.email);
    if (existingClient) {
      throw new Error(`Ya existe un cliente con el email: ${request.email}`);
    }

    try {
      // Crear la entidad cliente
      const client = Client.create(request);

      // Guardar en el repositorio
      await this.clientRepository.save(client);

      this.logger.info('Cliente creado exitosamente', { 
        clientId: client.id, 
        email: client.email 
      });

      return this.mapToResponse(client);
    } catch (error) {
      this.logger.error('Error al crear cliente', { 
        error: (error as Error).message,
        request 
      });
      throw error;
    }
  }

  private mapToResponse(client: Client): ClientResponse {
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
