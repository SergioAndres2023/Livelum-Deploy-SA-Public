import { StakeholderSearchCriteria } from './StakeholderSearchCriteria';
import { StakeholderType } from '../enums/StakeholderEnums';

export class StakeholderSearchCriteriaBuilder {
  private criteria: StakeholderSearchCriteria = {};

  static create(): StakeholderSearchCriteriaBuilder {
    return new StakeholderSearchCriteriaBuilder();
  }

  withNombre(nombre: string): StakeholderSearchCriteriaBuilder {
    this.criteria.nombre = nombre;
    return this;
  }

  withTipo(tipo: StakeholderType): StakeholderSearchCriteriaBuilder {
    this.criteria.tipo = tipo;
    return this;
  }

  withCompanyId(companyId: string): StakeholderSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  internalOnly(): StakeholderSearchCriteriaBuilder {
    this.criteria.tipo = StakeholderType.INTERNAL;
    return this;
  }

  externalOnly(): StakeholderSearchCriteriaBuilder {
    this.criteria.tipo = StakeholderType.EXTERNAL;
    return this;
  }

  withPagination(page: number, limit: number): StakeholderSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withSorting(
    sortBy: 'numero' | 'nombre' | 'tipo' | 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): StakeholderSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  build(): StakeholderSearchCriteria {
    return { ...this.criteria };
  }
}
