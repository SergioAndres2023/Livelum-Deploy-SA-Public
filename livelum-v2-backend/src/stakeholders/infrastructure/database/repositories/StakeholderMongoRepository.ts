import { Stakeholder } from '../../../domain/entities/Stakeholder';
import { StakeholderRepository } from '../../../domain/contracts/StakeholderRepository';
import { StakeholderSearchCriteria } from '../../../domain/filters/StakeholderSearchCriteria';
import { StakeholderModel } from '../schemas/StakeholderSchema';
import { StakeholderMapper } from '../mappers/StakeholderMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class StakeholderMongoRepository implements StakeholderRepository {
  constructor(private readonly logger: Logger) {}

  async save(stakeholder: Stakeholder): Promise<void> {
    try {
      const schema = StakeholderMapper.toPersistence(stakeholder);
      await StakeholderModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Stakeholder guardado', { stakeholderId: stakeholder.id });
    } catch (error) {
      this.logger.error('Error al guardar stakeholder', { 
        error: (error as Error).message,
        stakeholderId: stakeholder.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Stakeholder | null> {
    try {
      const schema = await StakeholderModel.findById(id).lean();
      if (!schema) return null;
      return StakeholderMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar stakeholder por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: StakeholderSearchCriteria): Promise<Stakeholder[]> {
    try {
      const filter: any = {};

      if (criteria.nombre) {
        filter.nombre = { $regex: criteria.nombre, $options: 'i' };
      }
      if (criteria.tipo) filter.tipo = criteria.tipo;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      const query = StakeholderModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ numero: 1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => StakeholderMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar stakeholders por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: StakeholderSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.nombre) {
        filter.nombre = { $regex: criteria.nombre, $options: 'i' };
      }
      if (criteria.tipo) filter.tipo = criteria.tipo;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      return await StakeholderModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar stakeholders', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await StakeholderModel.findByIdAndDelete(id);
      this.logger.info('Stakeholder eliminado', { stakeholderId: id });
    } catch (error) {
      this.logger.error('Error al eliminar stakeholder', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async getNextNumber(companyId: string): Promise<number> {
    try {
      const lastStakeholder = await StakeholderModel
        .findOne({ companyId })
        .sort({ numero: -1 })
        .lean();

      return lastStakeholder ? lastStakeholder.numero + 1 : 1;
    } catch (error) {
      this.logger.error('Error al obtener siguiente número de stakeholder', { 
        error: (error as Error).message,
        companyId 
      });
      throw error;
    }
  }
}

