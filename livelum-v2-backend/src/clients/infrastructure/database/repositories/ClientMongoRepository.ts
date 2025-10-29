import { Client } from '../../../domain/entities/Client';
import { ClientRepository } from '../../../domain/contracts/ClientRepository';
import { ClientSearchCriteria } from '../../../domain/filters/ClientCriteriaMother';
import { ClientModel } from '../schemas/ClientSchema';
import { ClientMapper } from '../mappers/ClientMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ClientMongoRepository implements ClientRepository {
  constructor(private readonly logger: Logger) {}

  async save(client: Client): Promise<void> {
    try {
      const clientData = ClientMapper.toPersistence(client);
      const clientDoc = new ClientModel(clientData);
      await clientDoc.save();
      
      this.logger.debug('Cliente guardado en MongoDB', { clientId: client.id });
    } catch (error) {
      this.logger.error('Error al guardar cliente en MongoDB', { 
        error: (error as Error).message,
        clientId: client.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Client | null> {
    try {
      const clientDoc = await ClientModel.findById(id);
      
      if (!clientDoc) {
        return null;
      }

      return ClientMapper.toDomain(clientDoc);
    } catch (error) {
      this.logger.error('Error al buscar cliente por ID en MongoDB', { 
        error: (error as Error).message,
        clientId: id 
      });
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Client | null> {
    try {
      const clientDoc = await ClientModel.findOne({ email: email.toLowerCase() });
      
      if (!clientDoc) {
        return null;
      }

      return ClientMapper.toDomain(clientDoc);
    } catch (error) {
      this.logger.error('Error al buscar cliente por email en MongoDB', { 
        error: (error as Error).message,
        email 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: ClientSearchCriteria): Promise<Client[]> {
    try {
      const query: any = {};

      // Filtros
      if (criteria.name) {
        query.name = { $regex: criteria.name, $options: 'i' };
      }
      if (criteria.email) {
        query.email = { $regex: criteria.email, $options: 'i' };
      }
      if (criteria.phone) {
        query.phone = { $regex: criteria.phone, $options: 'i' };
      }
      if (criteria.nif) {
        query.nif = criteria.nif.toUpperCase();
      }
      if (criteria.type) {
        query.type = criteria.type;
      }
      if (criteria.status) {
        query.status = criteria.status;
      }
      if (criteria.createdAfter) {
        query.createdAt = { ...query.createdAt, $gte: criteria.createdAfter };
      }
      if (criteria.createdBefore) {
        query.createdAt = { ...query.createdAt, $lte: criteria.createdBefore };
      }

      // Ordenamiento
      const sort: any = {};
      if (criteria.sortBy) {
        sort[criteria.sortBy] = criteria.sortOrder === 'desc' ? -1 : 1;
      } else {
        sort.createdAt = -1; // Orden por defecto
      }

      // Paginación
      let queryBuilder = ClientModel.find(query).sort(sort);
      
      if (criteria.limit) {
        queryBuilder = queryBuilder.limit(criteria.limit);
      }
      if (criteria.offset) {
        queryBuilder = queryBuilder.skip(criteria.offset);
      }

      const clientDocs = await queryBuilder.exec();
      
      this.logger.debug('Clientes encontrados con criterios', { 
        count: clientDocs.length,
        criteria 
      });

      return clientDocs.map(doc => ClientMapper.toDomain(doc));
    } catch (error) {
      this.logger.error('Error al buscar clientes con criterios en MongoDB', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async update(client: Client): Promise<void> {
    try {
      const clientData = ClientMapper.toPersistence(client);
      await ClientModel.findByIdAndUpdate(client.id, clientData, { new: true });
      
      this.logger.debug('Cliente actualizado en MongoDB', { clientId: client.id });
    } catch (error) {
      this.logger.error('Error al actualizar cliente en MongoDB', { 
        error: (error as Error).message,
        clientId: client.id 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await ClientModel.findByIdAndDelete(id);
      
      this.logger.debug('Cliente eliminado de MongoDB', { clientId: id });
    } catch (error) {
      this.logger.error('Error al eliminar cliente de MongoDB', { 
        error: (error as Error).message,
        clientId: id 
      });
      throw error;
    }
  }

  async count(criteria?: ClientSearchCriteria): Promise<number> {
    try {
      const query: any = {};

      if (criteria) {
        if (criteria.name) {
          query.name = { $regex: criteria.name, $options: 'i' };
        }
        if (criteria.email) {
          query.email = { $regex: criteria.email, $options: 'i' };
        }
        if (criteria.type) {
          query.type = criteria.type;
        }
        if (criteria.status) {
          query.status = criteria.status;
        }
        if (criteria.createdAfter) {
          query.createdAt = { ...query.createdAt, $gte: criteria.createdAfter };
        }
        if (criteria.createdBefore) {
          query.createdAt = { ...query.createdAt, $lte: criteria.createdBefore };
        }
      }

      const count = await ClientModel.countDocuments(query);
      
      this.logger.debug('Conteo de clientes', { count, criteria });
      
      return count;
    } catch (error) {
      this.logger.error('Error al contar clientes en MongoDB', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }
}
