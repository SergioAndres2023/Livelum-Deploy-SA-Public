/**
 * Value Object para información de contacto del proveedor
 */

export interface SupplierContactProps {
  cuit: string;
  email: string;
  telefono: string;
}

export class SupplierContact {
  private constructor(private readonly props: SupplierContactProps) {
    this.validate();
  }

  static create(cuit: string, email: string, telefono: string): SupplierContact {
    return new SupplierContact({ cuit, email, telefono });
  }

  static fromPrimitives(props: SupplierContactProps): SupplierContact {
    return new SupplierContact(props);
  }

  private validate(): void {
    if (!this.props.cuit || this.props.cuit.trim().length === 0) {
      throw new Error('El CUIT es requerido');
    }
    if (!this.props.email || this.props.email.trim().length === 0) {
      throw new Error('El email es requerido');
    }
    if (!this.validateEmail(this.props.email)) {
      throw new Error('El formato del email no es válido');
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toPrimitives(): SupplierContactProps {
    return { ...this.props };
  }

  get cuit(): string {
    return this.props.cuit;
  }

  get email(): string {
    return this.props.email;
  }

  get telefono(): string {
    return this.props.telefono;
  }
}

