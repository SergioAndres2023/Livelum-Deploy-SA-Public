import { UserSearchCriteria } from './UserSearchCriteria';
import { UserRole, UserStatus } from '../enums/UserEnums';

/**
 * Builder para construir criterios de búsqueda de Users de forma fluida
 */
export class UserSearchCriteriaBuilder {
  private criteria: UserSearchCriteria = {};

  static create(): UserSearchCriteriaBuilder {
    return new UserSearchCriteriaBuilder();
  }

  withUsername(username: string): UserSearchCriteriaBuilder {
    this.criteria.username = username;
    return this;
  }

  withNombre(nombre: string): UserSearchCriteriaBuilder {
    this.criteria.nombre = nombre;
    return this;
  }

  withApellido(apellido: string): UserSearchCriteriaBuilder {
    this.criteria.apellido = apellido;
    return this;
  }

  withEmail(email: string): UserSearchCriteriaBuilder {
    this.criteria.email = email;
    return this;
  }

  withCompanyId(companyId: string): UserSearchCriteriaBuilder {
    this.criteria.companyId = companyId;
    return this;
  }

  withRole(role: UserRole): UserSearchCriteriaBuilder {
    this.criteria.role = role;
    return this;
  }

  withStatus(status: UserStatus): UserSearchCriteriaBuilder {
    this.criteria.status = status;
    return this;
  }

  activeOnly(): UserSearchCriteriaBuilder {
    this.criteria.status = UserStatus.ACTIVE;
    return this;
  }

  inactiveOnly(): UserSearchCriteriaBuilder {
    this.criteria.status = UserStatus.INACTIVE;
    return this;
  }

  pendingOnly(): UserSearchCriteriaBuilder {
    this.criteria.status = UserStatus.PENDING;
    return this;
  }

  suspendedOnly(): UserSearchCriteriaBuilder {
    this.criteria.status = UserStatus.SUSPENDED;
    return this;
  }

  adminOnly(): UserSearchCriteriaBuilder {
    this.criteria.role = UserRole.ADMIN;
    return this;
  }

  consultorOnly(): UserSearchCriteriaBuilder {
    this.criteria.role = UserRole.CONSULTOR;
    return this;
  }

  emailVerifiedOnly(): UserSearchCriteriaBuilder {
    this.criteria.emailVerified = true;
    return this;
  }

  emailNotVerified(): UserSearchCriteriaBuilder {
    this.criteria.emailVerified = false;
    return this;
  }

  withPagination(page: number, limit: number): UserSearchCriteriaBuilder {
    this.criteria.limit = limit;
    this.criteria.offset = (page - 1) * limit;
    return this;
  }

  withLimit(limit: number): UserSearchCriteriaBuilder {
    this.criteria.limit = limit;
    return this;
  }

  withOffset(offset: number): UserSearchCriteriaBuilder {
    this.criteria.offset = offset;
    return this;
  }

  withSorting(
    sortBy: 'username' | 'nombre' | 'apellido' | 'email' | 'createdAt' | 'updatedAt' | 'lastLogin',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): UserSearchCriteriaBuilder {
    this.criteria.sortBy = sortBy;
    this.criteria.sortOrder = sortOrder;
    return this;
  }

  sortByUsername(order: 'asc' | 'desc' = 'asc'): UserSearchCriteriaBuilder {
    return this.withSorting('username', order);
  }

  sortByNombre(order: 'asc' | 'desc' = 'asc'): UserSearchCriteriaBuilder {
    return this.withSorting('nombre', order);
  }

  sortByEmail(order: 'asc' | 'desc' = 'asc'): UserSearchCriteriaBuilder {
    return this.withSorting('email', order);
  }

  sortByCreatedAt(order: 'asc' | 'desc' = 'desc'): UserSearchCriteriaBuilder {
    return this.withSorting('createdAt', order);
  }

  sortByLastLogin(order: 'asc' | 'desc' = 'desc'): UserSearchCriteriaBuilder {
    return this.withSorting('lastLogin', order);
  }

  build(): UserSearchCriteria {
    return { ...this.criteria };
  }
}

