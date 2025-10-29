import { Company } from '../entities/Company';
import { CompanySearchCriteria } from '../filters/CompanySearchCriteria';

/**
 * Contrato del repositorio de Companies
 * Define las operaciones de persistencia sin conocer la implementación
 */
export interface CompanyRepository {
  /**
   * Guarda una empresa en el repositorio
   */
  save(company: Company): Promise<void>;

  /**
   * Busca una empresa por su ID
   */
  findById(id: string): Promise<Company | null>;

  /**
   * Busca una empresa por su CUIT
   */
  findByCuit(cuit: string): Promise<Company | null>;

  /**
   * Busca empresas según criterios de búsqueda
   */
  findByCriteria(criteria: CompanySearchCriteria): Promise<Company[]>;

  /**
   * Cuenta el total de empresas según criterios
   */
  countByCriteria(criteria: CompanySearchCriteria): Promise<number>;

  /**
   * Elimina una empresa por su ID
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica si existe una empresa con el CUIT dado
   */
  existsByCuit(cuit: string): Promise<boolean>;
}

