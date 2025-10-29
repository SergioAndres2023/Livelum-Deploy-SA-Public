import { CompanySearchCriteria } from './CompanySearchCriteria';
import { CompanyStatus } from '../enums/CompanyEnums';

/**
 * Builder para construir criterios de búsqueda de Companies de forma fluida
 */
export class CompanySearchCriteriaBuilder {
  private criteria: CompanySearchCriteria = {};

  static create(): CompanySearchCriteriaBuilder {
    return new CompanySearchCriteriaBuilder();
  }

  withRazonSocial(razonSocial: string): CompanySearchCriteriaBuilder {
    this.criteria.razonSocial = razonSocial;
    return this;
  }

  withNombreFantasia(nombreFantasia: string): CompanySearchCriteriaBuilder {
    this.criteria.nombreFantasia = nombreFantasia;
    return this;
  }

  withCuit(cuit: string): CompanySearchCriteriaBuilder {
    this.criteria.cuit = cuit;
    return this;
  }

  withCiudad(ciudad: string): CompanySearchCriteriaBuilder {
    this.criteria.ciudad = ciudad;
    return this;
  }

  withProvincia(provincia: string): CompanySearchCriteriaBuilder {
    this.criteria.provincia = provincia;
    return this;
  }

  withStatus(status: CompanyStatus): CompanySearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  activeOnly(): CompanySearchCriteriaBuilder {
    this.criteria.status = CompanyStatus.ACTIVE;
    return this;
  }

  inactiveOnly(): CompanySearchCriteriaBuilder {
    this.criteria.status = CompanyStatus.INACTIVE;
    return this;
  }

  suspendedOnly(): CompanySearchCriteriaBuilder {
    this.criteria.status = CompanyStatus.SUSPENDED;
    return this;
  }

  withPagination(page: number, limit: number): CompanySearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withLimit(limit: number): CompanySearchCriteriaBuilder {
    this.criteria.limit = limit;
    return this;
  }

  withOffset(offset: number): CompanySearchCriteriaBuilder {
    this.criteria.offset = offset;
    return this;
  }

  withSorting(
    sortBy: 'razonSocial' | 'nombreFantasia' | 'cuit' | 'createdAt' | 'updatedAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): CompanySearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  sortByRazonSocial(order: 'asc' | 'desc' = 'asc'): CompanySearchCriteriaBuilder {
    return this.withSorting('razonSocial', order);
  }

  sortByNombreFantasia(order: 'asc' | 'desc' = 'asc'): CompanySearchCriteriaBuilder {
    return this.withSorting('nombreFantasia', order);
  }

  sortByCreatedAt(order: 'asc' | 'desc' = 'desc'): CompanySearchCriteriaBuilder {
    return this.withSorting('createdAt', order);
  }

  build(): CompanySearchCriteria {
    return { ...this.criteria };
  }
}

