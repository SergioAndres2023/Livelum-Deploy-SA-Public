import { Finding } from '../../../domain/entities/Finding';
import { FindingRepository } from '../../../domain/contracts/FindingRepository';
import { FindingSearchCriteria } from '../../../domain/filters/FindingSearchCriteria';
import { FindingModel } from '../schemas/FindingSchema';
import { FindingMapper } from '../mappers/FindingMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class FindingMongoRepository implements FindingRepository {
  constructor(private readonly logger: Logger) {}

  async save(finding: Finding): Promise<void> {
    try {
      const schema = FindingMapper.toPersistence(finding);
      await FindingModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Hallazgo guardado', { findingId: finding.id });
    } catch (error) {
      this.logger.error('Error al guardar hallazgo', { 
        error: (error as Error).message,
        findingId: finding.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Finding | null> {
    try {
      const schema = await FindingModel.findById(id).lean();
      if (!schema) return null;
      return FindingMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar hallazgo por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: FindingSearchCriteria): Promise<Finding[]> {
    try {
      const filter: any = {};

      if (criteria.summary) {
        filter.summary = { $regex: criteria.summary, $options: 'i' };
      }
      if (criteria.origin) filter.origin = criteria.origin;
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.processId) filter.processId = criteria.processId;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      if (criteria.detectionDateFrom || criteria.detectionDateTo) {
        filter.detectionDate = {};
        if (criteria.detectionDateFrom) {
          filter.detectionDate.$gte = criteria.detectionDateFrom;
        }
        if (criteria.detectionDateTo) {
          filter.detectionDate.$lte = criteria.detectionDateTo;
        }
      }

      // Para filtros de acciones/controles vencidos, necesitamos agregaciones complejas
      // Por simplicidad, implementamos filtros básicos aquí
      if (criteria.overdueActions) {
        filter['actions.plannedDate'] = { $lt: new Date() };
        filter['actions.status'] = { $nin: ['COMPLETED', 'CANCELLED'] };
      }

      if (criteria.overdueControls) {
        filter['controls.estimatedDate'] = { $lt: new Date() };
        filter['controls.status'] = { $ne: 'COMPLETED' };
      }

      const query = FindingModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ detectionDate: -1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => FindingMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar hallazgos por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: FindingSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.summary) {
        filter.summary = { $regex: criteria.summary, $options: 'i' };
      }
      if (criteria.origin) filter.origin = criteria.origin;
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.processId) filter.processId = criteria.processId;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      if (criteria.detectionDateFrom || criteria.detectionDateTo) {
        filter.detectionDate = {};
        if (criteria.detectionDateFrom) {
          filter.detectionDate.$gte = criteria.detectionDateFrom;
        }
        if (criteria.detectionDateTo) {
          filter.detectionDate.$lte = criteria.detectionDateTo;
        }
      }

      return await FindingModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar hallazgos', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await FindingModel.findByIdAndDelete(id);
      this.logger.info('Hallazgo eliminado', { findingId: id });
    } catch (error) {
      this.logger.error('Error al eliminar hallazgo', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

