import { EquipmentStatus, EquipmentType } from '../enums/EquipmentEnums';

export interface EquipmentSearchCriteria {
  name?: string;
  type?: EquipmentType;
  status?: EquipmentStatus;
  brand?: string;
  physicalLocation?: string;
  responsible?: string;
  needsMaintenance?: boolean;
  companyId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'type' | 'status' | 'brand' | 'physicalLocation' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
