/**
 * Enums del dominio de Suppliers (Proveedores)
 */

export enum SupplierStatus {
  APPROVED = 'APPROVED',
  CONDITIONAL = 'CONDITIONAL',
  NOT_APPROVED = 'NOT_APPROVED',
}

export const SupplierStatusLabels: Record<SupplierStatus, string> = {
  [SupplierStatus.APPROVED]: 'Aprobado',
  [SupplierStatus.CONDITIONAL]: 'Condicional',
  [SupplierStatus.NOT_APPROVED]: 'No Aprobado',
};

