import { EquipmentStatus, EquipmentType } from '../../domain/enums/EquipmentEnums';

export interface EquipmentResponse {
  id: string;
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
  isActive: boolean;
  isInMaintenance: boolean;
  needsMaintenance: boolean;
  createdAt: Date;
  updatedAt: Date;
}
