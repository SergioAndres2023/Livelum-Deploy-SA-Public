import { Company } from '../../../domain/entities/Company';
import type { CompanyRepository } from '../../../domain/contracts/CompanyRepository';
import { CompanySearchCriteria } from '../../../domain/filters/CompanySearchCriteria';
import { CompanyModel } from '../schemas/CompanySchema';
import { CompanySchemaType } from '../schemas/CompanySchemaType';
import { CompanyMapper } from '../mappers/CompanyMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CompanyMongoRepository implements CompanyRepository {
  constructor(private readonly logger: Logger) {}

  async save(company: Company): Promise<void> {
    try {
      const persistence = CompanyMapper.toPersistence(company);
      
      await CompanyModel.findByIdAndUpdate(
        persistence._id,
        persistence,
        { upsert: true, new: true }
      );

      this.logger.info('Empresa guardada en MongoDB', { companyId: company.id });
    } catch (error) {
      this.logger.error('Error al guardar empresa en MongoDB', {
        error: (error as Error).message,
        companyId: company.id,
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Company | null> {
    try {
      const document = await CompanyModel.findById(id).lean<CompanySchemaType>();

      if (!document) {
        return null;
      }

      return CompanyMapper.toDomain(document);
    } catch (error) {
      this.logger.error('Error al buscar empresa por ID', {
        error: (error as Error).message,
        id,
      });
      throw error;
    }
  }

  async findByCuit(cuit: string): Promise<Company | null> {
    try {
      const document = await CompanyModel.findOne({ cuit }).lean<CompanySchemaType>();

      if (!document) {
        return null;
      }

      return CompanyMapper.toDomain(document);
    } catch (error) {
      this.logger.error('Error al buscar empresa por CUIT', {
        error: (error as Error).message,
        cuit,
      });
      throw error;
    }
  }

  async findByCriteria(criteria: CompanySearchCriteria): Promise<Company[]> {
    try {
      const query: any = {};

      // Filtros de búsqueda
      if (criteria.razonSocial) {
        query.razonSocial = { $regex: criteria.razonSocial, $options: 'i' };
      }

      if (criteria.nombreFantasia) {
        query.nombreFantasia = { $regex: criteria.nombreFantasia, $options: 'i' };
      }

      if (criteria.cuit) {
        query.cuit = { $regex: criteria.cuit, $options: 'i' };
      }

      if (criteria.ciudad) {
        query.ciudad = { $regex: criteria.ciudad, $options: 'i' };
      }

      if (criteria.provincia) {
        query.provincia = { $regex: criteria.provincia, $options: 'i' };
      }

      if (criteria.status) {
        query.status = criteria.status;
      }

      // Construir la query
      let mongoQuery = CompanyModel.find(query);

      // Sorting
      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        mongoQuery = mongoQuery.sort({ [criteria.sortBy]: sortOrder });
      }

      // Paginación
      if (criteria.offset !== undefined) {
        mongoQuery = mongoQuery.skip(criteria.offset);
      }

      if (criteria.limit !== undefined) {
        mongoQuery = mongoQuery.limit(criteria.limit);
      }

      const documents = await mongoQuery.lean<CompanySchemaType[]>();

      return CompanyMapper.toDomainArray(documents);
    } catch (error) {
      this.logger.error('Error al buscar empresas por criterios', {
        error: (error as Error).message,
        criteria,
      });
      throw error;
    }
  }

  async countByCriteria(criteria: CompanySearchCriteria): Promise<number> {
    try {
      const query: any = {};

      if (criteria.razonSocial) {
        query.razonSocial = { $regex: criteria.razonSocial, $options: 'i' };
      }

      if (criteria.nombreFantasia) {
        query.nombreFantasia = { $regex: criteria.nombreFantasia, $options: 'i' };
      }

      if (criteria.cuit) {
        query.cuit = { $regex: criteria.cuit, $options: 'i' };
      }

      if (criteria.ciudad) {
        query.ciudad = { $regex: criteria.ciudad, $options: 'i' };
      }

      if (criteria.provincia) {
        query.provincia = { $regex: criteria.provincia, $options: 'i' };
      }

      if (criteria.status) {
        query.status = criteria.status;
      }

      return await CompanyModel.countDocuments(query);
    } catch (error) {
      this.logger.error('Error al contar empresas por criterios', {
        error: (error as Error).message,
        criteria,
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await CompanyModel.findByIdAndDelete(id);

      this.logger.info('Empresa eliminada de MongoDB', { companyId: id });
    } catch (error) {
      this.logger.error('Error al eliminar empresa de MongoDB', {
        error: (error as Error).message,
        id,
      });
      throw error;
    }
  }

  async existsByCuit(cuit: string): Promise<boolean> {
    try {
      const count = await CompanyModel.countDocuments({ cuit });
      return count > 0;
    } catch (error) {
      this.logger.error('Error al verificar existencia de empresa por CUIT', {
        error: (error as Error).message,
        cuit,
      });
      throw error;
    }
  }
}

