import { JobProfileSearchCriteria } from './JobProfileSearchCriteria';
import { JobProfileStatus, OrganizationalLevel } from '../enums/JobProfileEnums';

export class JobProfileSearchCriteriaBuilder {
  private criteria: JobProfileSearchCriteria = {};

  static create(): JobProfileSearchCriteriaBuilder {
    return new JobProfileSearchCriteriaBuilder();
  }

  withName(name: string): JobProfileSearchCriteriaBuilder {
    this.criteria.name = name;
    return this;
  }

  withStatus(status: JobProfileStatus): JobProfileSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withOrganizationalLevel(level: OrganizationalLevel): JobProfileSearchCriteriaBuilder {
    this.criteria.organizationalLevel = level;
    return this;
  }

  withParentJobProfileId(parentId: string): JobProfileSearchCriteriaBuilder {
    this.criteria.parentJobProfileId = parentId;
    return this;
  }

  withSupervisorUserId(supervisorId: string): JobProfileSearchCriteriaBuilder {
    this.criteria.supervisorUserId = supervisorId;
    return this;
  }

  withCompanyId(companyId: string): JobProfileSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  activeOnly(): JobProfileSearchCriteriaBuilder {
    this.criteria.status = JobProfileStatus.ACTIVE;
    return this;
  }

  withPagination(page: number, limit: number): JobProfileSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'name' | 'organizationalChart' | 'organizationalLevel' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): JobProfileSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): JobProfileSearchCriteria {
    return { ...this.criteria };
  }
}
