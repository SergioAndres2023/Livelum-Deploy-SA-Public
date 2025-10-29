import { CompanySearchCriteriaBuilder } from './CompanySearchCriteriaBuilder';
import { CompanySearchCriteria } from './CompanySearchCriteria';

/**
 * Object Mother para crear criterios de búsqueda predefinidos
 * Útil para testing y casos de uso comunes
 */
export class CompanySearchCriteriaMother {
  /**
   * Criterio para buscar por razón social
   */
  static byRazonSocial(razonSocial: string): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .withRazonSocial(razonSocial)
      .sortByRazonSocial('asc')
      .build();
  }

  /**
   * Criterio para buscar por nombre de fantasía
   */
  static byNombreFantasia(nombreFantasia: string): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .withNombreFantasia(nombreFantasia)
      .sortByNombreFantasia('asc')
      .build();
  }

  /**
   * Criterio para buscar por CUIT
   */
  static byCuit(cuit: string): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .withCuit(cuit)
      .build();
  }

  /**
   * Criterio para obtener todas las empresas activas
   */
  static allActive(): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .activeOnly()
      .sortByRazonSocial('asc')
      .build();
  }

  /**
   * Criterio para obtener todas las empresas inactivas
   */
  static allInactive(): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .inactiveOnly()
      .sortByRazonSocial('asc')
      .build();
  }

  /**
   * Criterio para obtener todas las empresas suspendidas
   */
  static allSuspended(): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .suspendedOnly()
      .sortByRazonSocial('asc')
      .build();
  }

  /**
   * Criterio para búsqueda por ubicación
   */
  static byLocation(ciudad: string, provincia: string): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .withCiudad(ciudad)
      .withProvincia(provincia)
      .sortByRazonSocial('asc')
      .build();
  }

  /**
   * Criterio con paginación por defecto
   */
  static withDefaultPagination(page: number = 1): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .withPagination(page, 10)
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio para obtener empresas recientes
   */
  static recent(limit: number = 10): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .withLimit(limit)
      .sortByCreatedAt('desc')
      .build();
  }

  /**
   * Criterio vacío (todas las empresas)
   */
  static all(): CompanySearchCriteria {
    return CompanySearchCriteriaBuilder
      .create()
      .sortByRazonSocial('asc')
      .build();
  }
}

