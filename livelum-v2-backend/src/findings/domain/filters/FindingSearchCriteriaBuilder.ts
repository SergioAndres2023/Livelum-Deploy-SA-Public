import { FindingSearchCriteria } from './FindingSearchCriteria';
import { FindingOrigin, FindingType, FindingStatus } from '../enums/FindingEnums';

export class FindingSearchCriteriaBuilder {
  private criteria: FindingSearchCriteria = {};

  static create(): FindingSearchCriteriaBuilder {
    return new FindingSearchCriteriaBuilder();
  }

  withSummary(summary: string): FindingSearchCriteriaBuilder {
    this.criteria.summary = summary;
    return this;
  }

  withOrigin(origin: FindingOrigin): FindingSearchCriteriaBuilder {
    this.criteria.origin = origin;
    return this;
  }

  withType(type: FindingType): FindingSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: FindingStatus): FindingSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withProcessId(processId: string): FindingSearchCriteriaBuilder {
    this.criteria.processId = processId;
    return this;
  }

  withCompanyId(companyId: string): FindingSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withDetectionDateRange(from: Date, to: Date): FindingSearchCriteriaBuilder {
    this.criteria.detectionDateFrom = from;
    this.criteria.detectionDateTo = to;
    return this;
  }

  openOnly(): FindingSearchCriteriaBuilder {
    this.criteria.status = FindingStatus.OPEN;
    return this;
  }

  inProgressOnly(): FindingSearchCriteriaBuilder {
    this.criteria.status = FindingStatus.IN_PROGRESS;
    return this;
  }

  overdueActionsOnly(): FindingSearchCriteriaBuilder {
    this.criteria.overdueActions = true;
    return this;
  }

  overdueControlsOnly(): FindingSearchCriteriaBuilder {
    this.criteria.overdueControls = true;
    return this;
  }

  withPagination(page: number, limit: number): FindingSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'detectionDate' | 'emissionDate' | 'status' | 'type' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): FindingSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): FindingSearchCriteria {
    return { ...this.criteria };
  }
}
