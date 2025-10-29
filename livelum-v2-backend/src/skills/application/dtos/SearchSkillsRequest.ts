import { SkillCategory, SkillStatus } from '../../domain/enums/SkillEnums';

export interface SearchSkillsRequest {
  title?: string;
  category?: SkillCategory;
  status?: SkillStatus;
  companyId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'number' | 'title' | 'category' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
