import { Equipment, EquipmentProps } from '../../../domain/entities/Equipment';
import { EquipmentSchemaType } from '../schemas/EquipmentSchemaType';

export class EquipmentMapper {
  static toPersistence(equipment: Equipment): EquipmentSchemaType {
    const primitives = equipment.toPrimitives();
    
    return {
      _id: primitives.id,
      name: primitives.name,
      type: primitives.type,
      brand: primitives.brand,
      model: primitives.model,
      serialNumber: primitives.serialNumber,
      code: primitives.code,
      physicalLocation: primitives.physicalLocation,
      status: primitives.status,
      acquisitionDate: primitives.acquisitionDate,
      lastMaintenanceDate: primitives.lastMaintenanceDate,
      nextMaintenanceDate: primitives.nextMaintenanceDate,
      responsible: primitives.responsible,
      notes: primitives.notes,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: EquipmentSchemaType): Equipment {
    const props: EquipmentProps = {
      id: schema._id,
      name: schema.name,
      type: schema.type,
      brand: schema.brand,
      model: schema.model,
      serialNumber: schema.serialNumber,
      code: schema.code,
      physicalLocation: schema.physicalLocation,
      status: schema.status,
      acquisitionDate: schema.acquisitionDate,
      lastMaintenanceDate: schema.lastMaintenanceDate,
      nextMaintenanceDate: schema.nextMaintenanceDate,
      responsible: schema.responsible,
      notes: schema.notes,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Equipment.fromPrimitives(props);
  }
}
