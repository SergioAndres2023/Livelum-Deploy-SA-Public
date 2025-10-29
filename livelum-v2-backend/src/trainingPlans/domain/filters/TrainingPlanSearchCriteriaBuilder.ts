import { TrainingPlanSearchCriteria } from './TrainingPlanSearchCriteria';
import { TrainingPlanType, TrainingPlanStatus } from '../enums/TrainingPlanEnums';

export class TrainingPlanSearchCriteriaBuilder {
  private criteria: TrainingPlanSearchCriteria = {};

  static create(): TrainingPlanSearchCriteriaBuilder {
    return new TrainingPlanSearchCriteriaBuilder();
  }

  withTopic(topic: string): TrainingPlanSearchCriteriaBuilder {
    this.criteria.topic = topic;
    return this;
  }

  withType(type: TrainingPlanType): TrainingPlanSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: TrainingPlanStatus): TrainingPlanSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withCompanyId(companyId: string): TrainingPlanSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withPlannedDateRange(from: Date, to: Date): TrainingPlanSearchCriteriaBuilder {
    this.criteria.plannedDateFrom = from;
    this.criteria.plannedDateTo = to;
    return this;
  }

  pendingOnly(): TrainingPlanSearchCriteriaBuilder {
    this.criteria.status = TrainingPlanStatus.PENDING;
    return this;
  }

  overdueOnly(): TrainingPlanSearchCriteriaBuilder {
    this.criteria.overdue = true;
    return this;
  }

  withPagination(page: number, limit: number): TrainingPlanSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'plannedDate' | 'topic' | 'status' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): TrainingPlanSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): TrainingPlanSearchCriteria {
    return { ...this.criteria };
  }
}
