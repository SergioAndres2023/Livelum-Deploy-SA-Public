import { EquipmentType } from '../../domain/enums/EquipmentEnums';

export interface UpdateEquipmentRequest {
  name?: string;
  type?: EquipmentType;
  brand?: string;
  model?: string;
  serialNumber?: string;
  code?: string;
  physicalLocation?: string;
  acquisitionDate?: string;
  responsible?: string;
  notes?: string;
}
