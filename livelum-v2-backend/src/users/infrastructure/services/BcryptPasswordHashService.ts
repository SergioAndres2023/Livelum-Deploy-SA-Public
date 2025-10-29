import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PasswordHashService } from '../../domain/services/PasswordHashService';

/**
 * Implementación del servicio de hash de contraseñas usando bcrypt
 */
export class BcryptPasswordHashService implements PasswordHashService {
  private readonly saltRounds: number = 10;

  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.saltRounds);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}

