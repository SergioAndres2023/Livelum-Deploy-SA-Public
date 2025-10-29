import { Objective } from '../../../domain/entities/Objective';
import { ObjectiveRepository } from '../../../domain/contracts/ObjectiveRepository';
import { ObjectiveSearchCriteria } from '../../../domain/filters/ObjectiveSearchCriteria';
import { ObjectiveModel } from '../schemas/ObjectiveSchema';
import { ObjectiveMapper } from '../mappers/ObjectiveMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ObjectiveMongoRepository implements ObjectiveRepository {
  constructor(private readonly logger: Logger) {}

  async save(objective: Objective): Promise<void> {
    try {
      const schema = ObjectiveMapper.toPersistence(objective);
      await ObjectiveModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Objetivo guardado', { objectiveId: objective.id });
    } catch (error) {
      this.logger.error('Error al guardar objetivo', { 
        error: (error as Error).message,
        objectiveId: objective.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Objective | null> {
    try {
      const schema = await ObjectiveModel.findById(id).lean();
      if (!schema) return null;
      return ObjectiveMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar objetivo por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: ObjectiveSearchCriteria): Promise<Objective[]> {
    try {
      const filter: any = {};

      if (criteria.title) {
        filter.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.companyId) filter.companyId = criteria.companyId;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.responsibleUserId) filter.responsibleUserId = criteria.responsibleUserId;
      if (criteria.indicatorId) filter.indicatorId = criteria.indicatorId;
      if (criteria.overdue) {
        filter.targetDate = { $lt: new Date() };
        filter.status = { $nin: ['COMPLETED', 'CANCELLED'] };
      }

      const query = ObjectiveModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => ObjectiveMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar objetivos por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: ObjectiveSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.title) {
        filter.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.companyId) filter.companyId = criteria.companyId;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.responsibleUserId) filter.responsibleUserId = criteria.responsibleUserId;
      if (criteria.indicatorId) filter.indicatorId = criteria.indicatorId;
      if (criteria.overdue) {
        filter.targetDate = { $lt: new Date() };
        filter.status = { $nin: ['COMPLETED', 'CANCELLED'] };
      }

      return await ObjectiveModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar objetivos', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await ObjectiveModel.findByIdAndDelete(id);
      this.logger.info('Objetivo eliminado', { objectiveId: id });
    } catch (error) {
      this.logger.error('Error al eliminar objetivo', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

