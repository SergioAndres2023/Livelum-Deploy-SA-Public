import { RiskSearchCriteria } from '../contracts/RiskRepository';
import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../enums/RiskEnums';

export class RiskSearchCriteriaBuilder {
  private criteria: RiskSearchCriteria = {};

  static create(): RiskSearchCriteriaBuilder {
    return new RiskSearchCriteriaBuilder();
  }

  withTitle(title: string): RiskSearchCriteriaBuilder {
    this.criteria.title = title;
    return this;
  }

  withCode(code: string): RiskSearchCriteriaBuilder {
    this.criteria.code = code;
    return this;
  }

  withCategory(category: RiskCategory): RiskSearchCriteriaBuilder {
    this.criteria.category = category;
    return this;
  }

  withProbability(probability: RiskProbability): RiskSearchCriteriaBuilder {
    this.criteria.probability = probability;
    return this;
  }

  withImpact(impact: RiskImpact): RiskSearchCriteriaBuilder {
    this.criteria.impact = impact;
    return this;
  }

  withRiskLevel(riskLevel: RiskLevel): RiskSearchCriteriaBuilder {
    this.criteria.riskLevel = riskLevel;
    return this;
  }

  withStatus(status: RiskStatus): RiskSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withOwner(owner: string): RiskSearchCriteriaBuilder {
    this.criteria.owner = owner;
    return this;
  }

  withOverdue(): RiskSearchCriteriaBuilder {
    this.criteria.isOverdue = true;
    return this;
  }

  withCritical(): RiskSearchCriteriaBuilder {
    this.criteria.isCritical = true;
    return this;
  }

  withHighRisk(): RiskSearchCriteriaBuilder {
    this.criteria.riskLevel = RiskLevel.ALTO;
    return this;
  }

  withDueDateRange(from: Date, to: Date): RiskSearchCriteriaBuilder {
    this.criteria.dueDateFrom = from;
    this.criteria.dueDateTo = to;
    return this;
  }

  withCreatedDateRange(from: Date, to: Date): RiskSearchCriteriaBuilder {
    this.criteria.createdAtFrom = from;
    this.criteria.createdAtTo = to;
    return this;
  }

  withPagination(page: number, limit: number): RiskSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(sortBy: RiskSearchCriteria['sortBy'], sortOrder: 'asc' | 'desc' = 'asc'): RiskSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): RiskSearchCriteria {
    return { ...this.criteria };
  }
}

export class RiskSearchCriteriaMother {
  static byTitle(title: string): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withTitle(title)
      .withSorting('title', 'asc')
      .build();
  }

  static byCategory(category: RiskCategory): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withCategory(category)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static byStatus(status: RiskStatus): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withStatus(status)
      .withSorting('dueDate', 'asc')
      .build();
  }

  static byRiskLevel(level: RiskLevel): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withRiskLevel(level)
      .withSorting('riskLevel', 'desc')
      .build();
  }

  static critical(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withCritical()
      .withSorting('dueDate', 'asc')
      .build();
  }

  static overdue(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withOverdue()
      .withSorting('dueDate', 'asc')
      .build();
  }

  static highRisk(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withHighRisk()
      .withSorting('riskLevel', 'desc')
      .build();
  }

  static active(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withStatus(RiskStatus.ACTIVE)
      .withSorting('riskLevel', 'desc')
      .build();
  }

  static monitored(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withStatus(RiskStatus.MONITORED)
      .withSorting('dueDate', 'asc')
      .build();
  }

  static mitigated(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withStatus(RiskStatus.MITIGATED)
      .withSorting('updatedAt', 'desc')
      .build();
  }

  static closed(): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withStatus(RiskStatus.CLOSED)
      .withSorting('updatedAt', 'desc')
      .build();
  }

  static recent(days: number = 30): RiskSearchCriteria {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    
    return RiskSearchCriteriaBuilder
      .create()
      .withCreatedDateRange(fromDate, new Date())
      .withSorting('createdAt', 'desc')
      .build();
  }

  static dueSoon(days: number = 7): RiskSearchCriteria {
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + days);
    
    return RiskSearchCriteriaBuilder
      .create()
      .withDueDateRange(new Date(), toDate)
      .withSorting('dueDate', 'asc')
      .build();
  }

  static withPagination(page: number, limit: number): RiskSearchCriteria {
    return RiskSearchCriteriaBuilder
      .create()
      .withPagination(page, limit)
      .withSorting('createdAt', 'desc')
      .build();
  }
}
