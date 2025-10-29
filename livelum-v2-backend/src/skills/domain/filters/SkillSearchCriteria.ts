import { SkillCategory, SkillStatus } from '../enums/SkillEnums';

export interface SkillSearchCriteria {
  title?: string;
  category?: SkillCategory;
  status?: SkillStatus;
  companyId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'number' | 'title' | 'category' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
