import { SkillSearchCriteria } from './SkillSearchCriteria';
import { SkillCategory, SkillStatus } from '../enums/SkillEnums';

export class SkillSearchCriteriaBuilder {
  private criteria: SkillSearchCriteria = {};

  static create(): SkillSearchCriteriaBuilder {
    return new SkillSearchCriteriaBuilder();
  }

  withTitle(title: string): SkillSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  withCategory(category: SkillCategory): SkillSearchCriteriaBuilder {
    this.criteria.category = category;
    return this;
  }

  withStatus(status: SkillStatus): SkillSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withCompanyId(companyId: string): SkillSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  activeOnly(): SkillSearchCriteriaBuilder {
    this.criteria.status = SkillStatus.ACTIVE;
    return this;
  }

  withPagination(page: number, limit: number): SkillSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'number' | 'title' | 'category' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): SkillSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): SkillSearchCriteria {
    return { ...this.criteria };
  }
}
