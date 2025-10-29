/**
 * Enums del dominio de Equipment (Equipos y Sistemas)
 */

export enum EquipmentStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  INACTIVE = 'INACTIVE',
  RETIRED = 'RETIRED',
}

export const EquipmentStatusLabels: Record<EquipmentStatus, string> = {
  [EquipmentStatus.ACTIVE]: 'Activo',
  [EquipmentStatus.MAINTENANCE]: 'Mantenimiento',
  [EquipmentStatus.INACTIVE]: 'Inactivo',
  [EquipmentStatus.RETIRED]: 'Retirado',
};

export enum EquipmentType {
  COMPUTER = 'COMPUTER',
  SERVER = 'SERVER',
  NETWORK = 'NETWORK',
  PRINTER = 'PRINTER',
  TOOL = 'TOOL',
  MACHINERY = 'MACHINERY',
  VEHICLE = 'VEHICLE',
  MEASUREMENT = 'MEASUREMENT',
  OTHER = 'OTHER',
}

export const EquipmentTypeLabels: Record<EquipmentType, string> = {
  [EquipmentType.COMPUTER]: 'Computadora',
  [EquipmentType.SERVER]: 'Servidor',
  [EquipmentType.NETWORK]: 'Red',
  [EquipmentType.PRINTER]: 'Impresora',
  [EquipmentType.TOOL]: 'Herramienta',
  [EquipmentType.MACHINERY]: 'Maquinaria',
  [EquipmentType.VEHICLE]: 'Vehículo',
  [EquipmentType.MEASUREMENT]: 'Medición',
  [EquipmentType.OTHER]: 'Otro',
};
