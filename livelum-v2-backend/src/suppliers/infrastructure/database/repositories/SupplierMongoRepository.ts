import { Supplier } from '../../../domain/entities/Supplier';
import { SupplierRepository } from '../../../domain/contracts/SupplierRepository';
import { SupplierSearchCriteria } from '../../../domain/filters/SupplierSearchCriteria';
import { SupplierModel } from '../schemas/SupplierSchema';
import { SupplierMapper } from '../mappers/SupplierMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SupplierMongoRepository implements SupplierRepository {
  constructor(private readonly logger: Logger) {}

  async save(supplier: Supplier): Promise<void> {
    try {
      const schema = SupplierMapper.toPersistence(supplier);
      await SupplierModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Proveedor guardado', { supplierId: supplier.id });
    } catch (error) {
      this.logger.error('Error al guardar proveedor', { 
        error: (error as Error).message,
        supplierId: supplier.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Supplier | null> {
    try {
      const schema = await SupplierModel.findById(id).lean();
      if (!schema) return null;
      return SupplierMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar proveedor por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: SupplierSearchCriteria): Promise<Supplier[]> {
    try {
      const filter: any = {};

      if (criteria.rubro) {
        filter.rubro = { $regex: criteria.rubro, $options: 'i' };
      }
      if (criteria.proveedor) {
        filter.proveedor = { $regex: criteria.proveedor, $options: 'i' };
      }
      if (criteria.estado) filter.estado = criteria.estado;
      if (criteria.companyId) filter.companyId = criteria.companyId;
      
      if (criteria.minEvaluacion !== undefined || criteria.maxEvaluacion !== undefined) {
        filter.evaluacion = {};
        if (criteria.minEvaluacion !== undefined) {
          filter.evaluacion.$gte = criteria.minEvaluacion;
        }
        if (criteria.maxEvaluacion !== undefined) {
          filter.evaluacion.$lte = criteria.maxEvaluacion;
        }
      }

      if (criteria.evaluationOverdue) {
        filter.siguienteEvaluacion = { $lt: new Date() };
        filter.estado = { $ne: 'NOT_APPROVED' };
      }

      const query = SupplierModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ evaluacion: -1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => SupplierMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar proveedores por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: SupplierSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.rubro) {
        filter.rubro = { $regex: criteria.rubro, $options: 'i' };
      }
      if (criteria.proveedor) {
        filter.proveedor = { $regex: criteria.proveedor, $options: 'i' };
      }
      if (criteria.estado) filter.estado = criteria.estado;
      if (criteria.companyId) filter.companyId = criteria.companyId;
      
      if (criteria.minEvaluacion !== undefined || criteria.maxEvaluacion !== undefined) {
        filter.evaluacion = {};
        if (criteria.minEvaluacion !== undefined) {
          filter.evaluacion.$gte = criteria.minEvaluacion;
        }
        if (criteria.maxEvaluacion !== undefined) {
          filter.evaluacion.$lte = criteria.maxEvaluacion;
        }
      }

      if (criteria.evaluationOverdue) {
        filter.siguienteEvaluacion = { $lt: new Date() };
        filter.estado = { $ne: 'NOT_APPROVED' };
      }

      return await SupplierModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar proveedores', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await SupplierModel.findByIdAndDelete(id);
      this.logger.info('Proveedor eliminado', { supplierId: id });
    } catch (error) {
      this.logger.error('Error al eliminar proveedor', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}

