import { DocumentType, DocumentStatus } from '../enums/DocumentEnums';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface DocumentProps {
  id: string;
  code: string;
  title: string;
  description?: string;
  version: string;
  type: DocumentType;
  status: DocumentStatus;
  author: string;
  createdDate: Date;
  expiryDate?: Date;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentPrimitives {
  code: string;
  title: string;
  description?: string;
  type: DocumentType;
  author: string;
  expiryDate?: Date;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
}

export class Document {
  private constructor(private props: DocumentProps) {}

  static create(primitives: CreateDocumentPrimitives): Document {
    const now = new Date();
    const id = UniqueEntityID.createObjectId().toPrimitive();

    const props: DocumentProps = {
      id,
      code: primitives.code.trim().toUpperCase(),
      title: primitives.title.trim(),
      description: primitives.description?.trim(),
      version: '1.0',
      type: primitives.type,
      status: DocumentStatus.BORRADOR,
      author: primitives.author.trim(),
      createdDate: now,
      expiryDate: primitives.expiryDate,
      fileUrl: primitives.fileUrl,
      fileName: primitives.fileName,
      fileSize: primitives.fileSize,
      mimeType: primitives.mimeType,
      createdAt: now,
      updatedAt: now,
    };

    this.validateDocument(props);

    return new Document(props);
  }

  static fromPrimitives(props: DocumentProps): Document {
    return new Document(props);
  }

  private static validateDocument(props: DocumentProps): void {
    if (!props.code || props.code.length < 3) {
      throw new Error('El código debe tener al menos 3 caracteres');
    }

    if (!props.title || props.title.length < 2) {
      throw new Error('El título debe tener al menos 2 caracteres');
    }

    if (!props.author || props.author.length < 2) {
      throw new Error('El autor debe tener al menos 2 caracteres');
    }

    if (props.expiryDate && props.expiryDate <= props.createdDate) {
      throw new Error('La fecha de vencimiento debe ser posterior a la fecha de creación');
    }

    if (props.fileSize && props.fileSize < 0) {
      throw new Error('El tamaño del archivo debe ser positivo');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get code(): string {
    return this.props.code;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get version(): string {
    return this.props.version;
  }

  get type(): DocumentType {
    return this.props.type;
  }

  get status(): DocumentStatus {
    return this.props.status;
  }

  get author(): string {
    return this.props.author;
  }

  get createdDate(): Date {
    return this.props.createdDate;
  }

  get expiryDate(): Date | undefined {
    return this.props.expiryDate;
  }

  get fileUrl(): string | undefined {
    return this.props.fileUrl;
  }

  get fileName(): string | undefined {
    return this.props.fileName;
  }

  get fileSize(): number | undefined {
    return this.props.fileSize;
  }

  get mimeType(): string | undefined {
    return this.props.mimeType;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  updateInfo(updates: Partial<CreateDocumentPrimitives>): void {
    if (updates.code) {
      this.props.code = updates.code.trim().toUpperCase();
    }
    if (updates.title) {
      this.props.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
      this.props.description = updates.description?.trim();
    }
    if (updates.type) {
      this.props.type = updates.type;
    }
    if (updates.author) {
      this.props.author = updates.author.trim();
    }
    if (updates.expiryDate !== undefined) {
      this.props.expiryDate = updates.expiryDate;
    }

    this.props.updatedAt = new Date();
    Document.validateDocument(this.props);
  }

  incrementVersion(): void {
    const versionParts = this.props.version.split('.');
    const major = parseInt(versionParts[0] || '1', 10);
    const minor = parseInt(versionParts[1] || '0', 10);
    this.props.version = `${major}.${minor + 1}`;
    this.props.updatedAt = new Date();
  }

  approve(): void {
    if (this.props.status !== DocumentStatus.EN_REVISION) {
      throw new Error('Solo se pueden aprobar documentos en revisión');
    }
    this.props.status = DocumentStatus.APROBADO;
    this.props.updatedAt = new Date();
  }

  reject(): void {
    if (this.props.status !== DocumentStatus.EN_REVISION) {
      throw new Error('Solo se pueden rechazar documentos en revisión');
    }
    this.props.status = DocumentStatus.BORRADOR;
    this.props.updatedAt = new Date();
  }

  sendToReview(): void {
    if (this.props.status !== DocumentStatus.BORRADOR) {
      throw new Error('Solo se pueden enviar a revisión documentos en borrador');
    }
    this.props.status = DocumentStatus.EN_REVISION;
    this.props.updatedAt = new Date();
  }

  archive(): void {
    this.props.status = DocumentStatus.VENCIDO;
    this.props.updatedAt = new Date();
  }

  softDelete(): void {
    this.props.status = DocumentStatus.ELIMINADO;
    this.props.updatedAt = new Date();
  }

  isDeleted(): boolean {
    return this.props.status === DocumentStatus.ELIMINADO;
  }

  isActive(): boolean {
    return this.props.status !== DocumentStatus.ELIMINADO;
  }

  restore(): void {
    if (!this.isDeleted()) {
      throw new Error('Solo se pueden restaurar documentos eliminados');
    }
    this.props.status = DocumentStatus.BORRADOR;
    this.props.updatedAt = new Date();
  }

  attachFile(fileUrl: string, fileName: string, fileSize: number, mimeType: string): void {
    this.props.fileUrl = fileUrl;
    this.props.fileName = fileName;
    this.props.fileSize = fileSize;
    this.props.mimeType = mimeType;
    this.props.updatedAt = new Date();
  }

  checkExpiry(): boolean {
    if (!this.props.expiryDate) {
      return false;
    }
    return new Date() > this.props.expiryDate;
  }

  isExpired(): boolean {
    return this.checkExpiry();
  }

  isExpiringSoon(daysThreshold: number = 30): boolean {
    if (!this.props.expiryDate) {
      return false;
    }
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
    return this.props.expiryDate <= thresholdDate && this.props.expiryDate > new Date();
  }

  toPrimitives(): DocumentProps {
    return { ...this.props };
  }
}
