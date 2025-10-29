import { UserSearchCriteriaBuilder } from './UserSearchCriteriaBuilder';
import { UserSearchCriteria } from './UserSearchCriteria';

/**
 * Object Mother para crear criterios de búsqueda predefinidos
 * Útil para testing y casos de uso comunes
 */
export class UserSearchCriteriaMother {
  /**
   * Criterio para buscar por username
   */
  static byUsername(username: string): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .withUsername(username)
      .build();
  }

  /**
   * Criterio para buscar por email
   */
  static byEmail(email: string): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .withEmail(email)
      .build();
  }

  /**
   * Criterio para buscar por nombre
   */
  static byNombre(nombre: string): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .withNombre(nombre)
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para buscar por empresa
   */
  static byCompany(companyId: string): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .withCompanyId(companyId)
      .activeOnly()
      .sortByUsername('asc')
      .build();
  }

  /**
   * Criterio para obtener todos los usuarios activos
   */
  static allActive(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .activeOnly()
      .sortByUsername('asc')
      .build();
  }

  /**
   * Criterio para obtener todos los usuarios inactivos
   */
  static allInactive(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .inactiveOnly()
      .sortByUsername('asc')
      .build();
  }

  /**
   * Criterio para obtener todos los usuarios pendientes
   */
  static allPending(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .pendingOnly()
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio para obtener todos los administradores
   */
  static allAdmins(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .adminOnly()
      .activeOnly()
      .sortByUsername('asc')
      .build();
  }

  /**
   * Criterio para obtener todos los consultores
   */
  static allConsultores(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .consultorOnly()
      .activeOnly()
      .sortByUsername('asc')
      .build();
  }

  /**
   * Criterio para usuarios con email verificado
   */
  static emailVerified(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .emailVerifiedOnly()
      .activeOnly()
      .sortByUsername('asc')
      .build();
  }

  /**
   * Criterio para usuarios con email no verificado
   */
  static emailNotVerified(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .emailNotVerified()
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio con paginación por defecto
   */
  static withDefaultPagination(page: number = 1): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .withPagination(page, 10)
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio para obtener usuarios recientes
   */
  static recent(limit: number = 10): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .withLimit(limit)
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio para obtener usuarios activos recientemente
   */
  static recentlyActive(limit: number = 10): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .activeOnly()
      .withLimit(limit)
      .sortByLastLogin('desc')
      .build();
  }

  /**
   * Criterio vacío (todos los usuarios)
   */
  static all(): UserSearchCriteria {
    return UserSearchCriteriaBuilder
      .create()
      .sortByUsername('asc')
      .build();
  }
}

