import { TrainingPlan } from '../../../domain/entities/TrainingPlan';
import { TrainingPlanRepository } from '../../../domain/contracts/TrainingPlanRepository';
import { TrainingPlanSearchCriteria } from '../../../domain/filters/TrainingPlanSearchCriteria';
import { TrainingPlanModel } from '../schemas/TrainingPlanSchema';
import { TrainingPlanMapper } from '../mappers/TrainingPlanMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class TrainingPlanMongoRepository implements TrainingPlanRepository {
  constructor(private readonly logger: Logger) {}

  async save(trainingPlan: TrainingPlan): Promise<void> {
    try {
      const schema = TrainingPlanMapper.toPersistence(trainingPlan);
      await TrainingPlanModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Plan de capacitación guardado', { trainingPlanId: trainingPlan.id });
    } catch (error) {
      this.logger.error('Error al guardar plan de capacitación', { 
        error: (error as Error).message,
        trainingPlanId: trainingPlan.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<TrainingPlan | null> {
    try {
      const schema = await TrainingPlanModel.findById(id).lean();
      if (!schema) return null;
      return TrainingPlanMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar plan de capacitación por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: TrainingPlanSearchCriteria): Promise<TrainingPlan[]> {
    try {
      const filter: any = {};

      if (criteria.topic) {
        filter.topic = { $regex: criteria.topic, $options: 'i' };
      }
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      if (criteria.plannedDateFrom || criteria.plannedDateTo) {
        filter.plannedDate = {};
        if (criteria.plannedDateFrom) {
          filter.plannedDate.$gte = criteria.plannedDateFrom;
        }
        if (criteria.plannedDateTo) {
          filter.plannedDate.$lte = criteria.plannedDateTo;
        }
      }

      if (criteria.overdue) {
        filter.plannedDate = { $lt: new Date() };
        filter.status = { $nin: ['COMPLETED_SATISFACTORY', 'COMPLETED_UNSATISFACTORY', 'CANCELLED'] };
      }

      const query = TrainingPlanModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ plannedDate: -1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => TrainingPlanMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar planes de capacitación por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: TrainingPlanSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.topic) {
        filter.topic = { $regex: criteria.topic, $options: 'i' };
      }
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      if (criteria.plannedDateFrom || criteria.plannedDateTo) {
        filter.plannedDate = {};
        if (criteria.plannedDateFrom) {
          filter.plannedDate.$gte = criteria.plannedDateFrom;
        }
        if (criteria.plannedDateTo) {
          filter.plannedDate.$lte = criteria.plannedDateTo;
        }
      }

      return await TrainingPlanModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar planes de capacitación', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await TrainingPlanModel.findByIdAndDelete(id);
      this.logger.info('Plan de capacitación eliminado', { trainingPlanId: id });
    } catch (error) {
      this.logger.error('Error al eliminar plan de capacitación', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

