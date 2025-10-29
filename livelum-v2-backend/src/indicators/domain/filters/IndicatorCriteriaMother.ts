import { IndicatorSearchCriteria } from '../contracts/IndicatorRepository';
import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../enums/IndicatorEnums';

export class IndicatorSearchCriteriaBuilder {
  private criteria: IndicatorSearchCriteria = {};

  static create(): IndicatorSearchCriteriaBuilder {
    return new IndicatorSearchCriteriaBuilder();
  }

  withName(name: string): IndicatorSearchCriteriaBuilder {
    this.criteria.name = name;
    return this;
  }

  withCode(code: string): IndicatorSearchCriteriaBuilder {
    this.criteria.code = code;
    return this;
  }

  withCategory(category: IndicatorCategory): IndicatorSearchCriteriaBuilder {
    this.criteria.category = category;
    return this;
  }

  withType(type: IndicatorType): IndicatorSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withTrend(trend: IndicatorTrend): IndicatorSearchCriteriaBuilder {
    this.criteria.trend = trend;
    return this;
  }

  withStatus(status: IndicatorStatus): IndicatorSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withOwner(owner: string): IndicatorSearchCriteriaBuilder {
    this.criteria.owner = owner;
    return this;
  }

  withFrequency(frequency: IndicatorFrequency): IndicatorSearchCriteriaBuilder {
    this.criteria.frequency = frequency;
    return this;
  }

  withCritical(): IndicatorSearchCriteriaBuilder {
    this.criteria.isCritical = true;
    return this;
  }

  withWarning(): IndicatorSearchCriteriaBuilder {
    this.criteria.isWarning = true;
    return this;
  }

  withGood(): IndicatorSearchCriteriaBuilder {
    this.criteria.isGood = true;
    return this;
  }

  withAboveTarget(): IndicatorSearchCriteriaBuilder {
    this.criteria.isAboveTarget = true;
    return this;
  }

  withBelowTarget(): IndicatorSearchCriteriaBuilder {
    this.criteria.isBelowTarget = true;
    return this;
  }

  withOnTarget(): IndicatorSearchCriteriaBuilder {
    this.criteria.isAboveTarget = false;
    this.criteria.isBelowTarget = false;
    return this;
  }

  withLastUpdateRange(from: Date, to: Date): IndicatorSearchCriteriaBuilder {
    this.criteria.lastUpdateFrom = from;
    this.criteria.lastUpdateTo = to;
    return this;
  }

  withCreatedDateRange(from: Date, to: Date): IndicatorSearchCriteriaBuilder {
    this.criteria.createdAtFrom = from;
    this.criteria.createdAtTo = to;
    return this;
  }

  withPagination(page: number, limit: number): IndicatorSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(sortBy: IndicatorSearchCriteria['sortBy'], sortOrder: 'asc' | 'desc' = 'asc'): IndicatorSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): IndicatorSearchCriteria {
    return { ...this.criteria };
  }
}

export class IndicatorSearchCriteriaMother {
  static byName(name: string): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withName(name)
      .withSorting('name', 'asc')
      .build();
  }

  static byCategory(category: IndicatorCategory): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withCategory(category)
      .withSorting('lastUpdate', 'desc')
      .build();
  }

  static byType(type: IndicatorType): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withType(type)
      .withSorting('currentValue', 'desc')
      .build();
  }

  static byStatus(status: IndicatorStatus): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withStatus(status)
      .withSorting('lastUpdate', 'asc')
      .build();
  }

  static critical(): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withCritical()
      .withSorting('lastUpdate', 'asc')
      .build();
  }

  static warning(): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withWarning()
      .withSorting('lastUpdate', 'asc')
      .build();
  }

  static good(): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withGood()
      .withSorting('currentValue', 'desc')
      .build();
  }

  static aboveTarget(): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withAboveTarget()
      .withSorting('currentValue', 'desc')
      .build();
  }

  static belowTarget(): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withBelowTarget()
      .withSorting('currentValue', 'asc')
      .build();
  }

  static onTarget(): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withOnTarget()
      .withSorting('lastUpdate', 'desc')
      .build();
  }

  static recent(days: number = 30): IndicatorSearchCriteria {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    
    return IndicatorSearchCriteriaBuilder
      .create()
      .withLastUpdateRange(fromDate, new Date())
      .withSorting('lastUpdate', 'desc')
      .build();
  }

  static needsUpdate(days: number = 7): IndicatorSearchCriteria {
    const toDate = new Date();
    toDate.setDate(toDate.getDate() - days);
    
    return IndicatorSearchCriteriaBuilder
      .create()
      .withLastUpdateRange(new Date(0), toDate)
      .withSorting('lastUpdate', 'asc')
      .build();
  }

  static withPagination(page: number, limit: number): IndicatorSearchCriteria {
    return IndicatorSearchCriteriaBuilder
      .create()
      .withPagination(page, limit)
      .withSorting('createdAt', 'desc')
      .build();
  }
}
