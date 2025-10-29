import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface ProcessTypeLink {
  name: string;
  path: string;
}

export interface ProcessTypeProps {
  id: string;
  order: number;
  name: string;
  links: ProcessTypeLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProcessTypePrimitives {
  order: number;
  name: string;
  links?: ProcessTypeLink[];
}

export class ProcessType {
  private constructor(private props: ProcessTypeProps) {}

  static create(primitives: CreateProcessTypePrimitives): ProcessType {
    const now = new Date();
    const id = UniqueEntityID.createObjectId().toPrimitive();

    const props: ProcessTypeProps = {
      id,
      order: primitives.order,
      name: primitives.name.trim().toUpperCase(),
      links: primitives.links || [],
      createdAt: now,
      updatedAt: now,
    };

    this.validateProcessType(props);

    return new ProcessType(props);
  }

  static fromPrimitives(props: ProcessTypeProps): ProcessType {
    return new ProcessType(props);
  }

  private static validateProcessType(props: ProcessTypeProps): void {
    if (props.order < 1) {
      throw new Error('El orden debe ser mayor a 0');
    }

    if (!props.name || props.name.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    if (props.links) {
      props.links.forEach((link, index) => {
        if (!link.name || link.name.trim().length === 0) {
          throw new Error(`El nombre del link en la posición ${index + 1} no puede estar vacío`);
        }
        if (!link.path || link.path.trim().length === 0) {
          throw new Error(`El path del link en la posición ${index + 1} no puede estar vacío`);
        }
      });
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get order(): number {
    return this.props.order;
  }

  get name(): string {
    return this.props.name;
  }

  get links(): ProcessTypeLink[] {
    return [...this.props.links];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  updateInfo(updates: Partial<CreateProcessTypePrimitives>): void {
    if (updates.order !== undefined) {
      this.props.order = updates.order;
    }
    if (updates.name) {
      this.props.name = updates.name.trim().toUpperCase();
    }
    if (updates.links !== undefined) {
      this.props.links = updates.links;
    }

    this.props.updatedAt = new Date();
    ProcessType.validateProcessType(this.props);
  }

  updateOrder(newOrder: number): void {
    if (newOrder < 1) {
      throw new Error('El orden debe ser mayor a 0');
    }
    this.props.order = newOrder;
    this.props.updatedAt = new Date();
  }

  addLink(link: ProcessTypeLink): void {
    if (!link.name || link.name.trim().length === 0) {
      throw new Error('El nombre del link no puede estar vacío');
    }
    if (!link.path || link.path.trim().length === 0) {
      throw new Error('El path del link no puede estar vacío');
    }

    // Verificar que no exista un link con el mismo nombre
    const existingLink = this.props.links.find(l => l.name.toLowerCase() === link.name.toLowerCase());
    if (existingLink) {
      throw new Error(`Ya existe un link con el nombre "${link.name}"`);
    }

    this.props.links.push({
      name: link.name.trim(),
      path: link.path.trim(),
    });
    this.props.updatedAt = new Date();
  }

  removeLink(linkName: string): void {
    const linkIndex = this.props.links.findIndex(l => l.name.toLowerCase() === linkName.toLowerCase());
    if (linkIndex === -1) {
      throw new Error(`No se encontró un link con el nombre "${linkName}"`);
    }

    this.props.links.splice(linkIndex, 1);
    this.props.updatedAt = new Date();
  }

  updateLink(linkName: string, newLink: ProcessTypeLink): void {
    const linkIndex = this.props.links.findIndex(l => l.name.toLowerCase() === linkName.toLowerCase());
    if (linkIndex === -1) {
      throw new Error(`No se encontró un link con el nombre "${linkName}"`);
    }

    if (!newLink.name || newLink.name.trim().length === 0) {
      throw new Error('El nombre del link no puede estar vacío');
    }
    if (!newLink.path || newLink.path.trim().length === 0) {
      throw new Error('El path del link no puede estar vacío');
    }

    // Verificar que no exista otro link con el mismo nombre (excepto el que estamos actualizando)
    const existingLink = this.props.links.find((l, index) => 
      index !== linkIndex && l.name.toLowerCase() === newLink.name.toLowerCase()
    );
    if (existingLink) {
      throw new Error(`Ya existe un link con el nombre "${newLink.name}"`);
    }

    this.props.links[linkIndex] = {
      name: newLink.name.trim(),
      path: newLink.path.trim(),
    };
    this.props.updatedAt = new Date();
  }

  toPrimitives(): ProcessTypeProps {
    return { ...this.props };
  }
}
