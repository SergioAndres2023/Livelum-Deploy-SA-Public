import { Person } from '../../../domain/entities/Person';
import { PersonRepository } from '../../../domain/contracts/PersonRepository';
import { PersonSearchCriteria } from '../../../domain/filters/PersonSearchCriteria';
import { PersonModel } from '../schemas/PersonSchema';
import { PersonMapper } from '../mappers/PersonMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class PersonMongoRepository implements PersonRepository {
  constructor(private readonly logger: Logger) {}

  async save(person: Person): Promise<void> {
    try {
      const schema = PersonMapper.toPersistence(person);
      await PersonModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Persona guardada', { personId: person.id });
    } catch (error) {
      this.logger.error('Error al guardar persona', { 
        error: (error as Error).message,
        personId: person.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Person | null> {
    try {
      const schema = await PersonModel.findById(id).lean();
      if (!schema) {
        return null;
      }
      return PersonMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar persona por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByUsername(username: string): Promise<Person | null> {
    try {
      const schema = await PersonModel.findOne({ username }).lean();
      if (!schema) {
        return null;
      }
      return PersonMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar persona por username', { 
        error: (error as Error).message,
        username 
      });
      throw error;
    }
  }

  async findByDocument(documento: string): Promise<Person | null> {
    try {
      const schema = await PersonModel.findOne({ documento }).lean();
      if (!schema) {
        return null;
      }
      return PersonMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar persona por documento', { 
        error: (error as Error).message,
        documento 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: PersonSearchCriteria): Promise<Person[]> {
    try {
      const filter: any = {};

      if (criteria.username) {
        filter.username = { $regex: criteria.username, $options: 'i' };
      }

      if (criteria.nombre) {
        filter.nombre = { $regex: criteria.nombre, $options: 'i' };
      }

      if (criteria.apellido) {
        filter.apellido = { $regex: criteria.apellido, $options: 'i' };
      }

      if (criteria.email) {
        filter.email = { $regex: criteria.email, $options: 'i' };
      }

      if (criteria.documento) {
        filter.documento = { $regex: criteria.documento, $options: 'i' };
      }

      if (criteria.companyId) {
        filter.companyId = criteria.companyId;
      }

      if (criteria.status) {
        filter.status = criteria.status;
      }

      if (criteria.contractType) {
        filter.contractType = criteria.contractType;
      }

      if (criteria.department) {
        filter.department = { $regex: criteria.department, $options: 'i' };
      }

      if (criteria.position) {
        filter.positions = criteria.position;
      }

      const query = PersonModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      }

      if (criteria.offset !== undefined) {
        query.skip(criteria.offset);
      }

      if (criteria.limit !== undefined) {
        query.limit(criteria.limit);
      }

      const schemas = await query.lean();
      return schemas.map(schema => PersonMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar personas por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: PersonSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.username) {
        filter.username = { $regex: criteria.username, $options: 'i' };
      }

      if (criteria.nombre) {
        filter.nombre = { $regex: criteria.nombre, $options: 'i' };
      }

      if (criteria.apellido) {
        filter.apellido = { $regex: criteria.apellido, $options: 'i' };
      }

      if (criteria.email) {
        filter.email = { $regex: criteria.email, $options: 'i' };
      }

      if (criteria.documento) {
        filter.documento = { $regex: criteria.documento, $options: 'i' };
      }

      if (criteria.companyId) {
        filter.companyId = criteria.companyId;
      }

      if (criteria.status) {
        filter.status = criteria.status;
      }

      if (criteria.contractType) {
        filter.contractType = criteria.contractType;
      }

      if (criteria.department) {
        filter.department = { $regex: criteria.department, $options: 'i' };
      }

      if (criteria.position) {
        filter.positions = criteria.position;
      }

      return await PersonModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar personas', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await PersonModel.findByIdAndDelete(id);
      this.logger.info('Persona eliminada', { personId: id });
    } catch (error) {
      this.logger.error('Error al eliminar persona', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async existsByUsername(username: string): Promise<boolean> {
    try {
      const count = await PersonModel.countDocuments({ username });
      return count > 0;
    } catch (error) {
      this.logger.error('Error al verificar existencia por username', { 
        error: (error as Error).message,
        username 
      });
      throw error;
    }
  }

  async existsByDocument(documento: string): Promise<boolean> {
    try {
      const count = await PersonModel.countDocuments({ documento });
      return count > 0;
    } catch (error) {
      this.logger.error('Error al verificar existencia por documento', { 
        error: (error as Error).message,
        documento 
      });
      throw error;
    }
  }
}

