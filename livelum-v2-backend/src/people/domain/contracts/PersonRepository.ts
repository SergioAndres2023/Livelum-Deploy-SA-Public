import { Person } from '../entities/Person';
import { PersonSearchCriteria } from '../filters/PersonSearchCriteria';

/**
 * Contrato del repositorio de People
 * Define las operaciones de persistencia sin conocer la implementación
 */
export interface PersonRepository {
  /**
   * Guarda una persona en el repositorio
   */
  save(person: Person): Promise<void>;

  /**
   * Busca una persona por su ID
   */
  findById(id: string): Promise<Person | null>;

  /**
   * Busca una persona por su username
   */
  findByUsername(username: string): Promise<Person | null>;

  /**
   * Busca una persona por su documento
   */
  findByDocument(documento: string): Promise<Person | null>;

  /**
   * Busca personas según criterios de búsqueda
   */
  findByCriteria(criteria: PersonSearchCriteria): Promise<Person[]>;

  /**
   * Cuenta el total de personas según criterios
   */
  countByCriteria(criteria: PersonSearchCriteria): Promise<number>;

  /**
   * Elimina una persona por su ID
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica si existe una persona con el username dado
   */
  existsByUsername(username: string): Promise<boolean>;

  /**
   * Verifica si existe una persona con el documento dado
   */
  existsByDocument(documento: string): Promise<boolean>;
}

