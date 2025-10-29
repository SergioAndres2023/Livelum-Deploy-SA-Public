/**
 * Enums del dominio de Skills (Competencias/Habilidades)
 */

export enum SkillCategory {
  TECHNICAL = 'TECHNICAL',
  MANAGEMENT = 'MANAGEMENT',
  COMMUNICATION = 'COMMUNICATION',
  LEADERSHIP = 'LEADERSHIP',
  ANALYTICAL = 'ANALYTICAL',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  TOOLS = 'TOOLS',
  OTHER = 'OTHER',
}

export const SkillCategoryLabels: Record<SkillCategory, string> = {
  [SkillCategory.TECHNICAL]: 'Técnica',
  [SkillCategory.MANAGEMENT]: 'Gestión',
  [SkillCategory.COMMUNICATION]: 'Comunicación',
  [SkillCategory.LEADERSHIP]: 'Liderazgo',
  [SkillCategory.ANALYTICAL]: 'Analítica',
  [SkillCategory.ORGANIZATIONAL]: 'Organizacional',
  [SkillCategory.TOOLS]: 'Herramientas',
  [SkillCategory.OTHER]: 'Otra',
};

export enum SkillLevel {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export const SkillLevelLabels: Record<SkillLevel, string> = {
  [SkillLevel.BASIC]: 'Básico',
  [SkillLevel.INTERMEDIATE]: 'Intermedio',
  [SkillLevel.ADVANCED]: 'Avanzado',
  [SkillLevel.EXPERT]: 'Experto',
};

export enum SkillStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const SkillStatusLabels: Record<SkillStatus, string> = {
  [SkillStatus.ACTIVE]: 'Activa',
  [SkillStatus.INACTIVE]: 'Inactiva',
};
