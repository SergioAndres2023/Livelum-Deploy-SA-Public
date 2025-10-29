/**
 * Enums del dominio de Companies
 */

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export const CompanyStatusLabels: Record<CompanyStatus, string> = {
  [CompanyStatus.ACTIVE]: 'Activa',
  [CompanyStatus.INACTIVE]: 'Inactiva',
  [CompanyStatus.SUSPENDED]: 'Suspendida',
};

