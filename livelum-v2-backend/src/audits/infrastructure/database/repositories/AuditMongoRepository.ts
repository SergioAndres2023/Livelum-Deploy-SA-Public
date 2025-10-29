import { injectable } from 'tsyringe';
import type { AuditRepository, AuditSearchCriteria } from '../../../domain/contracts/AuditRepository';
import { Audit } from '../../../domain/entities/Audit';
import { AuditStatus, AuditType } from '../../../domain/enums/AuditEnums';
import { AuditModel } from '../schemas/AuditSchema';
import { AuditMapper } from '../mappers/AuditMapper';
import type { Logger } from '../../../../cross-cutting/infrastructure/logger/Logger';

@injectable()
export class AuditMongoRepository implements AuditRepository {
  constructor(private readonly logger: Logger) {}

  async save(audit: Audit): Promise<void> {
    try {
      const auditData = AuditMapper.toPersistence(audit);
      const auditModel = new AuditModel(auditData);
      await auditModel.save();
      
      this.logger.info('Audit saved successfully', { id: audit.id, title: audit.title });
    } catch (error) {
      this.logger.error('Error saving audit', { error: (error as Error).message, id: audit.id });
      throw error;
    }
  }

  async findById(id: string): Promise<Audit | null> {
    try {
      const auditSchema = await AuditModel.findById(id);
      if (!auditSchema) {
        return null;
      }
      
      return AuditMapper.toDomain(auditSchema);
    } catch (error) {
      this.logger.error('Error finding audit by ID', { error: (error as Error).message, id });
      throw error;
    }
  }

  async findByCriteria(criteria: AuditSearchCriteria): Promise<Audit[]> {
    try {
      const query: any = {};

      // Filtros básicos
      if (criteria.title) {
        query.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.auditType) {
        query.auditType = criteria.auditType;
      }
      if (criteria.status) {
        query.status = criteria.status;
      }
      if (criteria.auditorName) {
        query.auditorName = { $regex: criteria.auditorName, $options: 'i' };
      }

      // Filtros de fecha
      if (criteria.dateFrom || criteria.dateTo) {
        query.plannedDate = {};
        if (criteria.dateFrom) {
          query.plannedDate.$gte = criteria.dateFrom;
        }
        if (criteria.dateTo) {
          query.plannedDate.$lte = criteria.dateTo;
        }
      }

      // Filtros especiales
      if (criteria.upcoming) {
        const thresholdDate = new Date();
        thresholdDate.setDate(thresholdDate.getDate() + 7);
        query.plannedDate = { $lte: thresholdDate, $gte: new Date() };
        query.status = AuditStatus.PLANNED;
      }
      if (criteria.overdue) {
        query.plannedDate = { $lt: new Date() };
        query.status = { $in: [AuditStatus.PLANNED, AuditStatus.IN_PROGRESS] };
      }
      if (criteria.completed) {
        query.status = AuditStatus.COMPLETED;
      }

      // Construir query con paginación y ordenamiento
      let mongoQuery = AuditModel.find(query);

      // Ordenamiento
      const sortBy = criteria.sortBy || 'plannedDate';
      const sortOrder = criteria.sortOrder === 'asc' ? 1 : -1;
      mongoQuery = mongoQuery.sort({ [sortBy]: sortOrder });

      // Paginación
      if (criteria.page && criteria.limit) {
        const skip = (criteria.page - 1) * criteria.limit;
        mongoQuery = mongoQuery.skip(skip).limit(criteria.limit);
      }

      const auditSchemas = await mongoQuery.exec();
      return auditSchemas.map(schema => AuditMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error finding audits by criteria', { error: (error as Error).message, criteria });
      throw error;
    }
  }

  async update(audit: Audit): Promise<void> {
    try {
      const auditData = AuditMapper.toPersistence(audit);
      await AuditModel.findByIdAndUpdate(audit.id, auditData, { new: true });
      
      this.logger.info('Audit updated successfully', { id: audit.id, title: audit.title });
    } catch (error) {
      this.logger.error('Error updating audit', { error: (error as Error).message, id: audit.id });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await AuditModel.findByIdAndDelete(id);
      
      this.logger.info('Audit deleted successfully', { id });
    } catch (error) {
      this.logger.error('Error deleting audit', { error: (error as Error).message, id });
      throw error;
    }
  }

  async countByStatus(status: AuditStatus): Promise<number> {
    try {
      return await AuditModel.countDocuments({ status });
    } catch (error) {
      this.logger.error('Error counting audits by status', { error: (error as Error).message, status });
      throw error;
    }
  }

  async countByType(type: AuditType): Promise<number> {
    try {
      return await AuditModel.countDocuments({ auditType: type });
    } catch (error) {
      this.logger.error('Error counting audits by type', { error: (error as Error).message, type });
      throw error;
    }
  }

  async countTotal(): Promise<number> {
    try {
      return await AuditModel.countDocuments();
    } catch (error) {
      this.logger.error('Error counting total audits', { error: (error as Error).message });
      throw error;
    }
  }

  async findUpcoming(daysAhead: number): Promise<Audit[]> {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() + daysAhead);
      
      const auditSchemas = await AuditModel.find({
        plannedDate: { $lte: thresholdDate, $gte: new Date() },
        status: AuditStatus.PLANNED
      }).sort({ plannedDate: 1 });

      return auditSchemas.map(schema => AuditMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error finding upcoming audits', { error: (error as Error).message, daysAhead });
      throw error;
    }
  }

  async findOverdue(): Promise<Audit[]> {
    try {
      const auditSchemas = await AuditModel.find({
        plannedDate: { $lt: new Date() },
        status: { $in: [AuditStatus.PLANNED, AuditStatus.IN_PROGRESS] }
      }).sort({ plannedDate: 1 });

      return auditSchemas.map(schema => AuditMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error finding overdue audits', { error: (error as Error).message });
      throw error;
    }
  }
}
