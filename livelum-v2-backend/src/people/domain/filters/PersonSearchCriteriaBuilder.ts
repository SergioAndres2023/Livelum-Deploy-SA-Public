import { PersonSearchCriteria } from './PersonSearchCriteria';
import { PersonStatus, ContractType } from '../enums/PersonEnums';

/**
 * Builder para construir criterios de búsqueda de People de forma fluida
 */
export class PersonSearchCriteriaBuilder {
  private criteria: PersonSearchCriteria = {};

  static create(): PersonSearchCriteriaBuilder {
    return new PersonSearchCriteriaBuilder();
  }

  withUsername(username: string): PersonSearchCriteriaBuilder {
    this.criteria.username = username;
    return this;
  }

  withNombre(nombre: string): PersonSearchCriteriaBuilder {
    this.criteria.nombre = nombre;
    return this;
  }

  withApellido(apellido: string): PersonSearchCriteriaBuilder {
    this.criteria.apellido = apellido;
    return this;
  }

  withEmail(email: string): PersonSearchCriteriaBuilder {
    this.criteria.email = email;
    return this;
  }

  withDocumento(documento: string): PersonSearchCriteriaBuilder {
    this.criteria.documento = documento;
    return this;
  }

  withCompanyId(companyId: string): PersonSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withStatus(status: PersonStatus): PersonSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  withContractType(contractType: ContractType): PersonSearchCriteriaBuilder {
    this.criteria.contractType = contractType;
    return this;
  }

  withDepartment(department: string): PersonSearchCriteriaBuilder {
    this.criteria.department = department;
    return this;
  }

  withPosition(position: string): PersonSearchCriteriaBuilder {
    this.criteria.position = position;
    return this;
  }

  activeOnly(): PersonSearchCriteriaBuilder {
    this.criteria.status = PersonStatus.ACTIVE;
    return this;
  }

  inactiveOnly(): PersonSearchCriteriaBuilder {
    this.criteria.status = PersonStatus.INACTIVE;
    return this;
  }

  onLeaveOnly(): PersonSearchCriteriaBuilder {
    this.criteria.status = PersonStatus.ON_LEAVE;
    return this;
  }

  suspendedOnly(): PersonSearchCriteriaBuilder {
    this.criteria.status = PersonStatus.SUSPENDED;
    return this;
  }

  terminatedOnly(): PersonSearchCriteriaBuilder {
    this.criteria.status = PersonStatus.TERMINATED;
    return this;
  }

  permanentOnly(): PersonSearchCriteriaBuilder {
    this.criteria.contractType = ContractType.PERMANENT;
    return this;
  }

  temporaryOnly(): PersonSearchCriteriaBuilder {
    this.criteria.contractType = ContractType.TEMPORARY;
    return this;
  }

  withPagination(page: number, limit: number): PersonSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withLimit(limit: number): PersonSearchCriteriaBuilder {
    this.criteria.limit = limit;
    return this;
  }

  withOffset(offset: number): PersonSearchCriteriaBuilder {
    this.criteria.offset = offset;
    return this;
  }

  withSorting(
    sortBy: 'username' | 'nombre' | 'apellido' | 'email' | 'documento' | 'createdAt' | 'updatedAt' | 'hireDate',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): PersonSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  sortByUsername(order: 'asc' | 'desc' = 'asc'): PersonSearchCriteriaBuilder {
    return this.withSorting('username', order);
  }

  sortByNombre(order: 'asc' | 'desc' = 'asc'): PersonSearchCriteriaBuilder {
    return this.withSorting('nombre', order);
  }

  sortByApellido(order: 'asc' | 'desc' = 'asc'): PersonSearchCriteriaBuilder {
    return this.withSorting('apellido', order);
  }

  sortByHireDate(order: 'asc' | 'desc' = 'desc'): PersonSearchCriteriaBuilder {
    return this.withSorting('hireDate', order);
  }

  sortByCreatedAt(order: 'asc' | 'desc' = 'desc'): PersonSearchCriteriaBuilder {
    return this.withSorting('createdAt', order);
  }

  build(): PersonSearchCriteria {
    return { ...this.criteria };
  }
}

