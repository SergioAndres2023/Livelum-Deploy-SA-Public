import { PersonSearchCriteriaBuilder } from './PersonSearchCriteriaBuilder';
import { PersonSearchCriteria } from './PersonSearchCriteria';

/**
 * Object Mother para crear criterios de búsqueda predefinidos
 * Útil para testing y casos de uso comunes
 */
export class PersonSearchCriteriaMother {
  /**
   * Criterio para buscar por username
   */
  static byUsername(username: string): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withUsername(username)
      .build();
  }

  /**
   * Criterio para buscar por documento
   */
  static byDocument(documento: string): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withDocumento(documento)
      .build();
  }

  /**
   * Criterio para buscar por nombre
   */
  static byNombre(nombre: string): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withNombre(nombre)
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para buscar por empresa
   */
  static byCompany(companyId: string): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withCompanyId(companyId)
      .activeOnly()
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para obtener todas las personas activas
   */
  static allActive(): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .activeOnly()
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para obtener todas las personas inactivas
   */
  static allInactive(): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .inactiveOnly()
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para obtener personas en licencia
   */
  static allOnLeave(): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .onLeaveOnly()
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para obtener personas con contrato permanente
   */
  static allPermanent(): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .permanentOnly()
      .activeOnly()
      .sortByHireDate('desc')
      .build();
  }

  /**
   * Criterio para obtener personas con contrato temporal
   */
  static allTemporary(): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .temporaryOnly()
      .activeOnly()
      .sortByHireDate('desc')
      .build();
  }

  /**
   * Criterio para buscar por departamento
   */
  static byDepartment(department: string): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withDepartment(department)
      .activeOnly()
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio para buscar por puesto
   */
  static byPosition(position: string): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withPosition(position)
      .activeOnly()
      .sortByNombre('asc')
      .build();
  }

  /**
   * Criterio con paginación por defecto
   */
  static withDefaultPagination(page: number = 1): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .withPagination(page, 10)
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio para obtener personas recién contratadas
   */
  static recentHires(limit: number = 10): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .activeOnly()
      .withLimit(limit)
      .sortByHireDate('desc')
      .build();
  }

  /**
   * Criterio vacío (todas las personas)
   */
  static all(): PersonSearchCriteria {
    return PersonSearchCriteriaBuilder
      .create()
      .sortByNombre('asc')
      .build();
  }
}

