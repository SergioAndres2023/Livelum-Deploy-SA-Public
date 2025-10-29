import { JobProfile } from '../../../domain/entities/JobProfile';
import { JobProfileRepository } from '../../../domain/contracts/JobProfileRepository';
import { JobProfileSearchCriteria } from '../../../domain/filters/JobProfileSearchCriteria';
import { JobProfileModel } from '../schemas/JobProfileSchema';
import { JobProfileMapper } from '../mappers/JobProfileMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class JobProfileMongoRepository implements JobProfileRepository {
  constructor(private readonly logger: Logger) {}

  async save(jobProfile: JobProfile): Promise<void> {
    try {
      const schema = JobProfileMapper.toPersistence(jobProfile);
      await JobProfileModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Perfil de puesto guardado', { jobProfileId: jobProfile.id });
    } catch (error) {
      this.logger.error('Error al guardar perfil de puesto', { 
        error: (error as Error).message,
        jobProfileId: jobProfile.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<JobProfile | null> {
    try {
      const schema = await JobProfileModel.findById(id).lean();
      if (!schema) return null;
      return JobProfileMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar perfil de puesto por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: JobProfileSearchCriteria): Promise<JobProfile[]> {
    try {
      const filter: any = {};

      if (criteria.name) {
        filter.name = { $regex: criteria.name, $options: 'i' };
      }
      if (criteria.status) filter.status = criteria.status;
      if (criteria.organizationalLevel) filter.organizationalLevel = criteria.organizationalLevel;
      if (criteria.parentJobProfileId) filter.parentJobProfileId = criteria.parentJobProfileId;
      if (criteria.supervisorUserId) filter.supervisorUserId = criteria.supervisorUserId;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      const query = JobProfileModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ organizationalChart: 1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => JobProfileMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar perfiles de puesto por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: JobProfileSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.name) {
        filter.name = { $regex: criteria.name, $options: 'i' };
      }
      if (criteria.status) filter.status = criteria.status;
      if (criteria.organizationalLevel) filter.organizationalLevel = criteria.organizationalLevel;
      if (criteria.parentJobProfileId) filter.parentJobProfileId = criteria.parentJobProfileId;
      if (criteria.supervisorUserId) filter.supervisorUserId = criteria.supervisorUserId;
      if (criteria.companyId) filter.companyId = criteria.companyId;

      return await JobProfileModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar perfiles de puesto', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await JobProfileModel.findByIdAndDelete(id);
      this.logger.info('Perfil de puesto eliminado', { jobProfileId: id });
    } catch (error) {
      this.logger.error('Error al eliminar perfil de puesto', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

