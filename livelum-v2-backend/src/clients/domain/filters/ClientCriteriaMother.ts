import { ClientStatus, ClientType } from '../enums/ClientEnums';

export interface ClientSearchCriteria {
  name?: string;
  email?: string;
  phone?: string;
  nif?: string;
  type?: ClientType;
  status?: ClientStatus;
  createdAfter?: Date;
  createdBefore?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export class ClientSearchCriteriaBuilder {
  private criteria: ClientSearchCriteria = {};

  static create(): ClientSearchCriteriaBuilder {
    return new ClientSearchCriteriaBuilder();
  }

  withName(name: string): ClientSearchCriteriaBuilder {
    this.criteria.name = name;
    return this;
  }

  withEmail(email: string): ClientSearchCriteriaBuilder {
    this.criteria.email = email;
    return this;
  }

  withPhone(phone: string): ClientSearchCriteriaBuilder {
    this.criteria.phone = phone;
    return this;
  }

  withNif(nif: string): ClientSearchCriteriaBuilder {
    this.criteria.nif = nif;
    return this;
  }

  withType(type: ClientType): ClientSearchCriteriaBuilder {
    this.criteria.type = type;
    return this;
  }

  withStatus(status: ClientStatus): ClientSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  createdAfter(date: Date): ClientSearchCriteriaBuilder {
    this.criteria.createdAfter = date;
    return this;
  }

  createdBefore(date: Date): ClientSearchCriteriaBuilder {
    this.criteria.createdBefore = date;
    return this;
  }

  withPagination(page: number, limit: number): ClientSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(sortBy: ClientSearchCriteria['sortBy'], sortOrder: 'asc' | 'desc'): ClientSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): ClientSearchCriteria {
    return { ...this.criteria };
  }
}

export class ClientSearchCriteriaMother {
  static byName(name: string): ClientSearchCriteria {
    return ClientSearchCriteriaBuilder
      .create()
      .withName(name)
      .withSorting('name', 'asc')
      .build();
  }

  static byEmail(email: string): ClientSearchCriteria {
    return ClientSearchCriteriaBuilder
      .create()
      .withEmail(email)
      .build();
  }

  static active(): ClientSearchCriteria {
    return ClientSearchCriteriaBuilder
      .create()
      .withStatus(ClientStatus.ACTIVE)
      .withSorting('name', 'asc')
      .build();
  }

  static recent(): ClientSearchCriteria {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return ClientSearchCriteriaBuilder
      .create()
      .createdAfter(thirtyDaysAgo)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static withPagination(page: number, limit: number): ClientSearchCriteria {
    return ClientSearchCriteriaBuilder
      .create()
      .withPagination(page, limit)
      .withSorting('createdAt', 'desc')
      .build();
  }

  static byType(type: ClientType): ClientSearchCriteria {
    return ClientSearchCriteriaBuilder
      .create()
      .withType(type)
      .withSorting('name', 'asc')
      .build();
  }
}
