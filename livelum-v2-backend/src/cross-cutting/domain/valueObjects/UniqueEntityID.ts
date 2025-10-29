import { randomUUID } from 'crypto';

/**
 * Value Object que representa un ID único para entidades
 * Basado en el patrón de cli-api-service pero adaptado para nuestro caso
 */
export class UniqueEntityID {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value || randomUUID();
  }

  /**
   * Crea un nuevo UniqueEntityID con un valor aleatorio
   */
  static create(): UniqueEntityID {
    return new UniqueEntityID();
  }

  /**
   * Crea un UniqueEntityID a partir de un string existente
   */
  static fromString(value: string): UniqueEntityID {
    return new UniqueEntityID(value);
  }

  /**
   * Crea un UniqueEntityID compatible con MongoDB ObjectId
   */
  static createObjectId(): UniqueEntityID {
    // Generamos un UUID y lo convertimos a un formato compatible con ObjectId
    const uuid = randomUUID().replace(/-/g, '');
    // Tomamos los primeros 24 caracteres para que sea compatible con ObjectId
    const objectIdCompatible = uuid.substring(0, 24);
    return new UniqueEntityID(objectIdCompatible);
  }

  /**
   * Retorna el valor primitivo del ID
   */
  toPrimitive(): string {
    return this._value;
  }

  /**
   * Retorna el valor primitivo del ID (alias para toPrimitive)
   */
  get value(): string {
    return this._value;
  }

  /**
   * Compara dos UniqueEntityID
   */
  equals(other: UniqueEntityID): boolean {
    return this._value === other._value;
  }

  /**
   * Convierte a string
   */
  toString(): string {
    return this._value;
  }
}
