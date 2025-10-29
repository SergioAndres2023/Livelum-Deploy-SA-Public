import { Skill } from '../../../domain/entities/Skill';
import { SkillRepository } from '../../../domain/contracts/SkillRepository';
import { SkillSearchCriteria } from '../../../domain/filters/SkillSearchCriteria';
import { SkillModel } from '../schemas/SkillSchema';
import { SkillMapper } from '../mappers/SkillMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SkillMongoRepository implements SkillRepository {
  constructor(private readonly logger: Logger) {}

  async save(skill: Skill): Promise<void> {
    try {
      const schema = SkillMapper.toPersistence(skill);
      await SkillModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Competencia guardada', { skillId: skill.id });
    } catch (error) {
      this.logger.error('Error al guardar competencia', { 
        error: (error as Error).message,
        skillId: skill.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Skill | null> {
    try {
      const schema = await SkillModel.findById(id).lean();
      if (!schema) return null;
      return SkillMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar competencia por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByNumber(number: number, companyId: string): Promise<Skill | null> {
    try {
      const schema = await SkillModel.findOne({ number, companyId }).lean();
      if (!schema) return null;
      return SkillMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar competencia por número', { 
        error: (error as Error).message,
        number,
        companyId 
      });
      throw error;
    }
  }

  async getNextNumber(companyId: string): Promise<number> {
    try {
      const lastSkill = await SkillModel.findOne({ companyId })
        .sort({ number: -1 })
        .limit(1)
        .lean();
      return lastSkill ? lastSkill.number + 1 : 1;
    } catch (error) {
      this.logger.error('Error al obtener siguiente número', { 
        error: (error as Error).message,
        companyId 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: SkillSearchCriteria): Promise<Skill[]> {
    try {
      const filter: any = {};

      if (criteria.title) {
        filter.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.category) filter.category = criteria.category;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      const query = SkillModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ number: 1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => SkillMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar competencias por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: SkillSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.title) {
        filter.title = { $regex: criteria.title, $options: 'i' };
      }
      if (criteria.category) filter.category = criteria.category;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      return await SkillModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar competencias', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await SkillModel.findByIdAndDelete(id);
      this.logger.info('Competencia eliminada', { skillId: id });
    } catch (error) {
      this.logger.error('Error al eliminar competencia', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}
