import { ActionPlanSearchCriteria } from './ActionPlanSearchCriteria';
import { ActionPlanOriginType, ActionPlanStatus } from '../enums/ActionPlanEnums';

export class ActionPlanSearchCriteriaBuilder {
  private criteria: ActionPlanSearchCriteria = {};

  static create(): ActionPlanSearchCriteriaBuilder {
    return new ActionPlanSearchCriteriaBuilder();
  }

  withOriginType(originType: ActionPlanOriginType): ActionPlanSearchCriteriaBuilder {
    this.criteria.originType = originType;
    return this;
  }

  withOriginId(originId: string): ActionPlanSearchCriteriaBuilder {
    this.criteria.originId = originId;
    return this;
  }

  withStatus(status: ActionPlanStatus): ActionPlanSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withCompanyId(companyId: string): ActionPlanSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withCreatedDateRange(from: Date, to: Date): ActionPlanSearchCriteriaBuilder {
    this.criteria.createdDateFrom = from;
    this.criteria.createdDateTo = to;
    return this;
  }

  withCompletionRange(min: number, max: number): ActionPlanSearchCriteriaBuilder {
    this.criteria.minCompletionPercentage = min;
    this.criteria.maxCompletionPercentage = max;
    return this;
  }

  pendingOnly(): ActionPlanSearchCriteriaBuilder {
    this.criteria.status = ActionPlanStatus.PENDING;
    return this;
  }

  inProgressOnly(): ActionPlanSearchCriteriaBuilder {
    this.criteria.status = ActionPlanStatus.IN_PROGRESS;
    return this;
  }

  completedOnly(): ActionPlanSearchCriteriaBuilder {
    this.criteria.status = ActionPlanStatus.COMPLETED;
    return this;
  }

  overdueOnly(): ActionPlanSearchCriteriaBuilder {
    this.criteria.status = ActionPlanStatus.OVERDUE;
    return this;
  }

  overdueActionsOnly(): ActionPlanSearchCriteriaBuilder {
    this.criteria.overdueActions = true;
    return this;
  }

  withPagination(page: number, limit: number): ActionPlanSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'createdDate' | 'status' | 'completionPercentage' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): ActionPlanSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): ActionPlanSearchCriteria {
    return { ...this.criteria };
  }
}
