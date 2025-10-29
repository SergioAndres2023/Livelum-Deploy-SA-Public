import { Minute } from '../../../domain/entities/Minute';
import { MinuteRepository } from '../../../domain/contracts/MinuteRepository';
import { MinuteSearchCriteria } from '../../../domain/filters/MinuteSearchCriteria';
import { MinuteModel } from '../schemas/MinuteSchema';
import { MinuteMapper } from '../mappers/MinuteMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class MinuteMongoRepository implements MinuteRepository {
  constructor(private readonly logger: Logger) {}

  async save(minute: Minute): Promise<void> {
    try {
      const schema = MinuteMapper.toPersistence(minute);
      await MinuteModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Minuta guardada', { minuteId: minute.id });
    } catch (error) {
      this.logger.error('Error al guardar minuta', { 
        error: (error as Error).message,
        minuteId: minute.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Minute | null> {
    try {
      const schema = await MinuteModel.findById(id).lean();
      if (!schema) return null;
      return MinuteMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar minuta por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: MinuteSearchCriteria): Promise<Minute[]> {
    try {
      const filter: any = {};

      if (criteria.title) {
        filter.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;
      if (criteria.createdBy) filter.createdBy = criteria.createdBy;

      if (criteria.meetingDateFrom || criteria.meetingDateTo) {
        filter.meetingDate = {};
        if (criteria.meetingDateFrom) {
          filter.meetingDate.$gte = criteria.meetingDateFrom;
        }
        if (criteria.meetingDateTo) {
          filter.meetingDate.$lte = criteria.meetingDateTo;
        }
      }

      const query = MinuteModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ meetingDate: -1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => MinuteMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar minutas por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: MinuteSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.title) {
        filter.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;
      if (criteria.createdBy) filter.createdBy = criteria.createdBy;

      if (criteria.meetingDateFrom || criteria.meetingDateTo) {
        filter.meetingDate = {};
        if (criteria.meetingDateFrom) {
          filter.meetingDate.$gte = criteria.meetingDateFrom;
        }
        if (criteria.meetingDateTo) {
          filter.meetingDate.$lte = criteria.meetingDateTo;
        }
      }

      return await MinuteModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar minutas', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await MinuteModel.findByIdAndDelete(id);
      this.logger.info('Minuta eliminada', { minuteId: id });
    } catch (error) {
      this.logger.error('Error al eliminar minuta', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

