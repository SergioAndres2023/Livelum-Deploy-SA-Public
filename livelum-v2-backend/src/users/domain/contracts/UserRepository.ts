import { User } from '../entities/User';
import { UserSearchCriteria } from '../filters/UserSearchCriteria';

/**
 * Contrato del repositorio de Users
 * Define las operaciones de persistencia sin conocer la implementación
 */
export interface UserRepository {
  /**
   * Guarda un usuario en el repositorio
   */
  save(user: User): Promise<void>;

  /**
   * Busca un usuario por su ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Busca un usuario por su username
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Busca un usuario por su email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Busca un usuario por su token de reset de contraseña
   */
  findByResetToken(token: string): Promise<User | null>;

  /**
   * Busca usuarios según criterios de búsqueda
   */
  findByCriteria(criteria: UserSearchCriteria): Promise<User[]>;

  /**
   * Cuenta el total de usuarios según criterios
   */
  countByCriteria(criteria: UserSearchCriteria): Promise<number>;

  /**
   * Elimina un usuario por su ID
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica si existe un usuario con el username dado
   */
  existsByUsername(username: string): Promise<boolean>;

  /**
   * Verifica si existe un usuario con el email dado
   */
  existsByEmail(email: string): Promise<boolean>;
}

