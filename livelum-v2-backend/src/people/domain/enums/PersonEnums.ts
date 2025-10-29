/**
 * Enums del dominio de People (Personal)
 */

export enum PersonStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
}

export const PersonStatusLabels: Record<PersonStatus, string> = {
  [PersonStatus.ACTIVE]: 'Activo',
  [PersonStatus.INACTIVE]: 'Inactivo',
  [PersonStatus.ON_LEAVE]: 'De licencia',
  [PersonStatus.SUSPENDED]: 'Suspendido',
  [PersonStatus.TERMINATED]: 'Desvinculado',
};

export enum ContractType {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
  PART_TIME = 'PART_TIME',
  CONTRACTOR = 'CONTRACTOR',
  INTERN = 'INTERN',
  FREELANCE = 'FREELANCE',
}

export const ContractTypeLabels: Record<ContractType, string> = {
  [ContractType.PERMANENT]: 'Permanente',
  [ContractType.TEMPORARY]: 'Temporal',
  [ContractType.PART_TIME]: 'Medio tiempo',
  [ContractType.CONTRACTOR]: 'Contratista',
  [ContractType.INTERN]: 'Pasante',
  [ContractType.FREELANCE]: 'Freelance',
};

