import { Authorization } from '../../../domain/entities/Authorization';
import { AuthorizationRepository } from '../../../domain/contracts/AuthorizationRepository';
import { AuthorizationSearchCriteria } from '../../../domain/filters/AuthorizationSearchCriteria';
import { AuthorizationModel } from '../schemas/AuthorizationSchema';
import { AuthorizationMapper } from '../mappers/AuthorizationMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class AuthorizationMongoRepository implements AuthorizationRepository {
  constructor(private readonly logger: Logger) {}

  async save(authorization: Authorization): Promise<void> {
    try {
      const schema = AuthorizationMapper.toPersistence(authorization);
      await AuthorizationModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Autorización guardada', { authorizationId: authorization.id });
    } catch (error) {
      this.logger.error('Error al guardar autorización', { 
        error: (error as Error).message,
        authorizationId: authorization.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Authorization | null> {
    try {
      const schema = await AuthorizationModel.findById(id).lean();
      if (!schema) return null;
      return AuthorizationMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar autorización por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: AuthorizationSearchCriteria): Promise<Authorization[]> {
    try {
      const filter: any = {};

      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.entityId) filter.entityId = criteria.entityId;
      if (criteria.requestedBy) filter.requestedBy = criteria.requestedBy;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      const query = AuthorizationModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ requestedAt: -1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => AuthorizationMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar autorizaciones por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: AuthorizationSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.entityId) filter.entityId = criteria.entityId;
      if (criteria.requestedBy) filter.requestedBy = criteria.requestedBy;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      return await AuthorizationModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar autorizaciones', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await AuthorizationModel.findByIdAndDelete(id);
      this.logger.info('Autorización eliminada', { authorizationId: id });
    } catch (error) {
      this.logger.error('Error al eliminar autorización', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}
