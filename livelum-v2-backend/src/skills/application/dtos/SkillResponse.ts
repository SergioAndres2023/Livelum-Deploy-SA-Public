import { SkillCategory, SkillStatus } from '../../domain/enums/SkillEnums';

export interface SkillResponse {
  id: string;
  number: number;
  title: string;
  description?: string;
  category: SkillCategory;
  status: SkillStatus;
  companyId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
