import { MinuteSearchCriteria } from './MinuteSearchCriteria';
import { MinuteType, MinuteStatus } from '../enums/MinuteEnums';

export class MinuteSearchCriteriaBuilder {
  private criteria: MinuteSearchCriteria = {};

  static create(): MinuteSearchCriteriaBuilder {
    return new MinuteSearchCriteriaBuilder();
  }

  withTitle(title: string): MinuteSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  withType(type: MinuteType): MinuteSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: MinuteStatus): MinuteSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withCompanyId(companyId: string): MinuteSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withMeetingDateRange(from: Date, to: Date): MinuteSearchCriteriaBuilder {
    this.criteria.meetingDateFrom = from;
    this.criteria.meetingDateTo = to;
    return this;
  }

  withCreatedBy(createdBy: string): MinuteSearchCriteriaBuilder {
    this.criteria.createdBy = createdBy;
    return this;
  }

  draftOnly(): MinuteSearchCriteriaBuilder {
    this.criteria.status = MinuteStatus.DRAFT;
    return this;
  }

  approvedOnly(): MinuteSearchCriteriaBuilder {
    this.criteria.status = MinuteStatus.APPROVED;
    return this;
  }

  withPagination(page: number, limit: number): MinuteSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'meetingDate' | 'title' | 'status' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): MinuteSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): MinuteSearchCriteria {
    return { ...this.criteria };
  }
}
