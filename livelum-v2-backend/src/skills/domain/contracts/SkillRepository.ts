import { Skill } from '../entities/Skill';
import { SkillSearchCriteria } from '../filters/SkillSearchCriteria';

export interface SkillRepository {
  save(skill: Skill): Promise<void>;
  findById(id: string): Promise<Skill | null>;
  findByNumber(number: number, companyId: string): Promise<Skill | null>;
  getNextNumber(companyId: string): Promise<number>;
  findByCriteria(criteria: SkillSearchCriteria): Promise<Skill[]>;
  countByCriteria(criteria: SkillSearchCriteria): Promise<number>;
  delete(id: string): Promise<void>;
}
