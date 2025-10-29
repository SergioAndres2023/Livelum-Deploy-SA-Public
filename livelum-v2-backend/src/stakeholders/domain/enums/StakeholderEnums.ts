/**
 * Enums del dominio de Stakeholders (Partes Interesadas)
 */

export enum StakeholderType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export const StakeholderTypeLabels: Record<StakeholderType, string> = {
  [StakeholderType.INTERNAL]: 'Interna',
  [StakeholderType.EXTERNAL]: 'Externa',
};

