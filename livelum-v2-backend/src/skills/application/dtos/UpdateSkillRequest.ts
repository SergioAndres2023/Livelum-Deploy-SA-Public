import { SkillCategory } from '../../domain/enums/SkillEnums';

export interface UpdateSkillRequest {
  title?: string;
  description?: string;
  number?: number;
  category?: SkillCategory;
}
