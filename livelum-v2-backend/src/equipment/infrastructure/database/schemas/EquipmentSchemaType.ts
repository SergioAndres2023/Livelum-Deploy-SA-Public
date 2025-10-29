import { EquipmentStatus, EquipmentType } from '../../../domain/enums/EquipmentEnums';

export interface EquipmentSchemaType {
  _id: string;
  name: string;
  type: EquipmentType;
  brand?: string;
  model?: string;
  serialNumber?: string;
  code?: string;
  physicalLocation?: string;
  status: EquipmentStatus;
  acquisitionDate?: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  responsible?: string;
  notes?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}
