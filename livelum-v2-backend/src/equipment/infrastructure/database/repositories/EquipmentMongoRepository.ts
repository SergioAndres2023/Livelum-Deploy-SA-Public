import { Equipment } from '../../../domain/entities/Equipment';
import { EquipmentRepository } from '../../../domain/contracts/EquipmentRepository';
import { EquipmentSearchCriteria } from '../../../domain/filters/EquipmentSearchCriteria';
import { EquipmentModel } from '../schemas/EquipmentSchema';
import { EquipmentMapper } from '../mappers/EquipmentMapper';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class EquipmentMongoRepository implements EquipmentRepository {
  constructor(private readonly logger: Logger) {}

  async save(equipment: Equipment): Promise<void> {
    try {
      const schema = EquipmentMapper.toPersistence(equipment);
      await EquipmentModel.findByIdAndUpdate(
        schema._id,
        schema,
        { upsert: true, new: true }
      );
      this.logger.info('Equipo guardado', { equipmentId: equipment.id });
    } catch (error) {
      this.logger.error('Error al guardar equipo', { 
        error: (error as Error).message,
        equipmentId: equipment.id 
      });
      throw error;
    }
  }

  async findById(id: string): Promise<Equipment | null> {
    try {
      const schema = await EquipmentModel.findById(id).lean();
      if (!schema) return null;
      return EquipmentMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar equipo por ID', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }

  async findBySerialNumber(serialNumber: string, companyId: string): Promise<Equipment | null> {
    try {
      const schema = await EquipmentModel.findOne({ serialNumber, companyId }).lean();
      if (!schema) return null;
      return EquipmentMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar equipo por número de serie', { 
        error: (error as Error).message,
        serialNumber,
        companyId 
      });
      throw error;
    }
  }

  async findByCode(code: string, companyId: string): Promise<Equipment | null> {
    try {
      const schema = await EquipmentModel.findOne({ code, companyId }).lean();
      if (!schema) return null;
      return EquipmentMapper.toDomain(schema);
    } catch (error) {
      this.logger.error('Error al buscar equipo por código', { 
        error: (error as Error).message,
        code,
        companyId 
      });
      throw error;
    }
  }

  async findByCriteria(criteria: EquipmentSearchCriteria): Promise<Equipment[]> {
    try {
      const filter: any = {};

      if (criteria.name) {
        filter.name = { $regex: criteria.name, $options: 'i' };
      }
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.brand) {
        filter.brand = { $regex: criteria.brand, $options: 'i' };
      }
      if (criteria.physicalLocation) {
        filter.physicalLocation = { $regex: criteria.physicalLocation, $options: 'i' };
      }
      if (criteria.responsible) filter.responsible = criteria.responsible;
      if (criteria.companyId) filter.companyId = criteria.companyId;
      if (criteria.needsMaintenance) {
        filter.nextMaintenanceDate = { $lte: new Date() };
      }

      const query = EquipmentModel.find(filter);

      if (criteria.sortBy) {
        const sortOrder = criteria.sortOrder === 'desc' ? -1 : 1;
        query.sort({ [criteria.sortBy]: sortOrder });
      } else {
        query.sort({ name: 1 });
      }

      if (criteria.offset !== undefined) query.skip(criteria.offset);
      if (criteria.limit !== undefined) query.limit(criteria.limit);

      const schemas = await query.lean();
      return schemas.map(schema => EquipmentMapper.toDomain(schema));
    } catch (error) {
      this.logger.error('Error al buscar equipos por criterios', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async countByCriteria(criteria: EquipmentSearchCriteria): Promise<number> {
    try {
      const filter: any = {};

      if (criteria.name) {
        filter.name = { $regex: criteria.name, $options: 'i' };
      }
      if (criteria.type) filter.type = criteria.type;
      if (criteria.status) filter.status = criteria.status;
      if (criteria.brand) {
        filter.brand = { $regex: criteria.brand, $options: 'i' };
      }
      if (criteria.physicalLocation) {
        filter.physicalLocation = { $regex: criteria.physicalLocation, $options: 'i' };
      }
      if (criteria.responsible) filter.responsible = criteria.responsible;
      if (criteria.companyId) filter.companyId = criteria.companyId;
      if (criteria.needsMaintenance) {
        filter.nextMaintenanceDate = { $lte: new Date() };
      }

      return await EquipmentModel.countDocuments(filter);
    } catch (error) {
      this.logger.error('Error al contar equipos', { 
        error: (error as Error).message,
        criteria 
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await EquipmentModel.findByIdAndDelete(id);
      this.logger.info('Equipo eliminado', { equipmentId: id });
    } catch (error) {
      this.logger.error('Error al eliminar equipo', { 
        error: (error as Error).message,
        id 
      });
      throw error;
    }
  }
}
