import { ActionPlan } from '../../../domain/entities/ActionPlan';
import { ActionPlanRepository } from '../../../domain/contracts/ActionPlanRepository';
import { ActionPlanSearchCriteria } from '../../../domain/filters/ActionPlanSearchCriteria';
import { ActionPlanModel } from '../schemas/ActionPlanSchema';
import { ActionPlanMapper } from '../mappers/ActionPlanMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class ActionPlanMongoRepository implements ActionPlanRepository {
  constructor(private readonly logger: Logger) {}

  async save(actionPlan: ActionPlan): Promise<void> {
    try {
      const schema = ActionPlanMapper.toPersistence(actionPlan);
      await ActionPlanModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Plan de acción guardado', { actionPlanId: actionPlan.id });
    } catch (error) {
      this.logger.error('Error al guardar plan de acción', { 
        error: (error as Error).message,
        actionPlanId: actionPlan.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<ActionPlan | null> {
    try {
      const schema = await ActionPlanModel.findById(id).lean();
      if (!schema) return null;
      return ActionPlanMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar plan de acción por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: ActionPlanSearchCriteria): Promise<ActionPlan[]> {
    try {
      const filter: any = {};

      if (criteria.originType) filter.originType = criteria.originType;
      if (criteria.originId) filter.originId = criteria.originId;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      if (criteria.createdDateFrom || criteria.createdDateTo) {
        filter.createdDate = {};
        if (criteria.createdDateFrom) {
          filter.createdDate.$gte = criteria.createdDateFrom;
        }
        if (criteria.createdDateTo) {
          filter.createdDate.$lte = criteria.createdDateTo;
        }
      }

      if (criteria.minCompletionPercentage !== undefined || criteria.maxCompletionPercentage !== undefined) {
        filter.completionPercentage = {};
        if (criteria.minCompletionPercentage !== undefined) {
          filter.completionPercentage.$gte = criteria.minCompletionPercentage;
        }
        if (criteria.maxCompletionPercentage !== undefined) {
          filter.completionPercentage.$lte = criteria.maxCompletionPercentage;
        }
      }

      if (criteria.overdueActions) {
        filter['actions.plannedDate'] = { $lt: new Date() };
        filter['actions.status'] = { $nin: ['COMPLETED', 'CANCELLED'] };
      }

      const query = ActionPlanModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ createdDate: -1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => ActionPlanMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar planes de acción por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: ActionPlanSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.originType) filter.originType = criteria.originType;
      if (criteria.originId) filter.originId = criteria.originId;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      if (criteria.createdDateFrom || criteria.createdDateTo) {
        filter.createdDate = {};
        if (criteria.createdDateFrom) {
          filter.createdDate.$gte = criteria.createdDateFrom;
        }
        if (criteria.createdDateTo) {
          filter.createdDate.$lte = criteria.createdDateTo;
        }
      }

      if (criteria.minCompletionPercentage !== undefined || criteria.maxCompletionPercentage !== undefined) {
        filter.completionPercentage = {};
        if (criteria.minCompletionPercentage !== undefined) {
          filter.completionPercentage.$gte = criteria.minCompletionPercentage;
        }
        if (criteria.maxCompletionPercentage !== undefined) {
          filter.completionPercentage.$lte = criteria.maxCompletionPercentage;
        }
      }

      return await ActionPlanModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar planes de acción', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await ActionPlanModel.findByIdAndDelete(id);
      this.logger.info('Plan de acción eliminado', { actionPlanId: id });
    } catch (error) {
      this.logger.error('Error al eliminar plan de acción', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

