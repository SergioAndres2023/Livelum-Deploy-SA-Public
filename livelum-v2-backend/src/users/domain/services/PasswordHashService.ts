/**
 * Servicio de dominio para hashear y verificar contraseñas
 * Interface que será implementada en la capa de infraestructura
 */
export interface PasswordHashService {
  /**
   * Hashea una contraseña en texto plano
   */
  hash(plainPassword: string): Promise<string>;

  /**
   * Compara una contraseña en texto plano con un hash
   */
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;

  /**
   * Genera un token aleatorio seguro
   */
  generateToken(): string;
}

