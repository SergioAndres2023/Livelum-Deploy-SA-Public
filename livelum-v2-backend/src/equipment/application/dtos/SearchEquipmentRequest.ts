import { EquipmentStatus, EquipmentType } from '../../domain/enums/EquipmentEnums';

export interface SearchEquipmentRequest {
  name?: string;
  type?: EquipmentType;
  status?: EquipmentStatus;
  brand?: string;
  physicalLocation?: string;
  responsible?: string;
  needsMaintenance?: boolean;
  companyId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'type' | 'status' | 'brand' | 'physicalLocation' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
