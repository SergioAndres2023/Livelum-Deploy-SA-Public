import { SkillCategory } from '../../domain/enums/SkillEnums';

export interface CreateSkillRequest {
  number: number;
  title: string;
  description?: string;
  category: SkillCategory;
  companyId: string;
}
