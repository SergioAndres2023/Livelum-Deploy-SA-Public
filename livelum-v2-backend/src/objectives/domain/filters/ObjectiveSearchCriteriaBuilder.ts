import { ObjectiveSearchCriteria } from './ObjectiveSearchCriteria';
import { ObjectiveStatus } from '../enums/ObjectiveEnums';

export class ObjectiveSearchCriteriaBuilder {
  private criteria: ObjectiveSearchCriteria = {};

  static create(): ObjectiveSearchCriteriaBuilder {
    return new ObjectiveSearchCriteriaBuilder();
  }

  withTitle(title: string): ObjectiveSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  withCompanyId(companyId: string): ObjectiveSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withStatus(status: ObjectiveStatus): ObjectiveSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withResponsibleUserId(userId: string): ObjectiveSearchCriteriaBuilder {
    this.criteria.responsibleUserId = userId;
    return this;
  }

  withIndicatorId(indicatorId: string): ObjectiveSearchCriteriaBuilder {
    this.criteria.indicatorId = indicatorId;
    return this;
  }

  activeOnly(): ObjectiveSearchCriteriaBuilder {
    this.criteria.status = ObjectiveStatus.ACTIVE;
    return this;
  }

  completedOnly(): ObjectiveSearchCriteriaBuilder {
    this.criteria.status = ObjectiveStatus.COMPLETED;
    return this;
  }

  overdueOnly(): ObjectiveSearchCriteriaBuilder {
    this.criteria.overdue = true;
    return this;
  }

  withPagination(page: number, limit: number): ObjectiveSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withLimit(limit: number): ObjectiveSearchCriteriaBuilder {
    this.criteria.limit = limit;
    return this;
  }

  withSorting(
    sortBy: 'title' | 'targetDate' | 'createdAt' | 'progress',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): ObjectiveSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  sortByTargetDate(order: 'asc' | 'desc' = 'asc'): ObjectiveSearchCriteriaBuilder {
    return this.withSorting('targetDate', order);
  }

  build(): ObjectiveSearchCriteria {
    return { ...this.criteria };
  }
}

