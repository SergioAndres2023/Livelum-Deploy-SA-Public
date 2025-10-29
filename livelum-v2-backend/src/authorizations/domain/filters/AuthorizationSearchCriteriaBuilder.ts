import { AuthorizationSearchCriteria } from './AuthorizationSearchCriteria';
import { AuthorizationStatus, AuthorizationType } from '../enums/AuthorizationEnums';

export class AuthorizationSearchCriteriaBuilder {
  private criteria: AuthorizationSearchCriteria = {};

  static create(): AuthorizationSearchCriteriaBuilder {
    return new AuthorizationSearchCriteriaBuilder();
  }

  withType(type: AuthorizationType): AuthorizationSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: AuthorizationStatus): AuthorizationSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withEntityId(entityId: string): AuthorizationSearchCriteriaBuilder {
    this.criteria.entityId = entityId;
    return this;
  }

  withRequestedBy(requestedBy: string): AuthorizationSearchCriteriaBuilder {
    this.criteria.requestedBy = requestedBy;
    return this;
  }

  withCompanyId(companyId: string): AuthorizationSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  pendingOnly(): AuthorizationSearchCriteriaBuilder {
    this.criteria.status = AuthorizationStatus.PENDING;
    return this;
  }

  approvedOnly(): AuthorizationSearchCriteriaBuilder {
    this.criteria.status = AuthorizationStatus.APPROVED;
    return this;
  }

  withPagination(page: number, limit: number): AuthorizationSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'requestedAt' | 'entityName' | 'status' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): AuthorizationSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): AuthorizationSearchCriteria {
    return { ...this.criteria };
  }
}
