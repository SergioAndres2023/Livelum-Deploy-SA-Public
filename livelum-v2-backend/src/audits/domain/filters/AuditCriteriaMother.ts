import { AuditSearchCriteria } from '../contracts/AuditRepository';
import { AuditType, AuditStatus } from '../enums/AuditEnums';

export class AuditSearchCriteriaBuilder {
  private criteria: AuditSearchCriteria = {};

  static create(): AuditSearchCriteriaBuilder {
    return new AuditSearchCriteriaBuilder();
  }

  byTitle(title: string): AuditSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  byAuditor(auditorName: string): AuditSearchCriteriaBuilder {
    this.criteria.auditorName = auditorName;
    return this;
  }

  byType(type: AuditType): AuditSearchCriteriaBuilder {
    this.criteria.auditType = type;
    return this;
  }

  byStatus(status: AuditStatus): AuditSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  upcoming(): AuditSearchCriteriaBuilder {
    this.criteria.upcoming = true;
    return this;
  }

  overdue(): AuditSearchCriteriaBuilder {
    this.criteria.overdue = true;
    return this;
  }

  completed(): AuditSearchCriteriaBuilder {
    this.criteria.completed = true;
    return this;
  }

  byDateRange(from: Date, to: Date): AuditSearchCriteriaBuilder {
    this.criteria.dateFrom = from;
    this.criteria.dateTo = to;
    return this;
  }

  planned(): AuditSearchCriteriaBuilder {
    this.criteria.status = AuditStatus.PLANNED;
    return this;
  }

  inProgress(): AuditSearchCriteriaBuilder {
    this.criteria.status = AuditStatus.IN_PROGRESS;
    return this;
  }

  cancelled(): AuditSearchCriteriaBuilder {
    this.criteria.status = AuditStatus.CANCELLED;
    return this;
  }

  internal(): AuditSearchCriteriaBuilder {
    this.criteria.auditType = AuditType.INTERNAL;
    return this;
  }

  external(): AuditSearchCriteriaBuilder {
    this.criteria.auditType = AuditType.EXTERNAL;
    return this;
  }

  withPagination(page: number, limit: number): AuditSearchCriteriaBuilder {
    this.criteria.page = page;
    this.criteria.limit = limit;
    return this;
  }

  withSorting(sortBy: string, sortOrder: 'asc' | 'desc'): AuditSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): AuditSearchCriteria {
    return { ...this.criteria };
  }
}

export class AuditCriteriaMother {
  static createBasicCriteria(): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }

  static createByTypeCriteria(type: AuditType): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .byType(type)
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }

  static createByStatusCriteria(status: AuditStatus): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .byStatus(status)
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }

  static createUpcomingCriteria(): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .upcoming()
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }

  static createOverdueCriteria(): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .overdue()
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }

  static createCompletedCriteria(): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .completed()
      .withPagination(1, 10)
      .withSorting('actualDate', 'desc')
      .build();
  }

  static createSearchCriteria(searchTerm: string): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .byTitle(searchTerm)
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }

  static createDateRangeCriteria(from: Date, to: Date): AuditSearchCriteria {
    return AuditSearchCriteriaBuilder.create()
      .byDateRange(from, to)
      .withPagination(1, 10)
      .withSorting('plannedDate', 'asc')
      .build();
  }
}
