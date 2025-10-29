/**
 * Enums del dominio de JobProfiles (Perfiles de Puesto)
 */

export enum JobProfileStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
}

export const JobProfileStatusLabels: Record<JobProfileStatus, string> = {
  [JobProfileStatus.ACTIVE]: 'Activo',
  [JobProfileStatus.INACTIVE]: 'Inactivo',
  [JobProfileStatus.DRAFT]: 'Borrador',
};

export enum OrganizationalLevel {
  EXECUTIVE = 'EXECUTIVE',
  MANAGEMENT = 'MANAGEMENT',
  SUPERVISION = 'SUPERVISION',
  OPERATIONAL = 'OPERATIONAL',
  SUPPORT = 'SUPPORT',
}

export const OrganizationalLevelLabels: Record<OrganizationalLevel, string> = {
  [OrganizationalLevel.EXECUTIVE]: 'Ejecutivo',
  [OrganizationalLevel.MANAGEMENT]: 'Gerencial',
  [OrganizationalLevel.SUPERVISION]: 'Supervisión',
  [OrganizationalLevel.OPERATIONAL]: 'Operativo',
  [OrganizationalLevel.SUPPORT]: 'Soporte',
};

