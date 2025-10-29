import { SkillCategory, SkillStatus } from '../../../domain/enums/SkillEnums';

export interface SkillSchemaType {
  _id: string;
  number: number;
  title: string;
  description?: string;
  category: SkillCategory;
  status: SkillStatus;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}
