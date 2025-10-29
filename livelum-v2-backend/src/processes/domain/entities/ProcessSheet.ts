import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';
import { ProcessStatus } from '../enums/ProcessEnums';

export interface ProcessSheetProps {
  id: string;
  code: string;
  name: string;
  processTypeId: string;
  processNameId: string;
  version: number;
  status: ProcessStatus;
  responsible: string;
  lastUpdate: Date;
  indicatorIds: string[];
  documentIds: string[];
  riskIds: string[];
  opportunityIds: string[];
  equipmentIds: string[];
  supplierIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProcessSheetPrimitives {
  name: string;
  processTypeId: string;
  processNameId: string;
  responsible: string;
}

export class ProcessSheet {
  private constructor(private props: ProcessSheetProps) {}

  static create(primitives: CreateProcessSheetPrimitives): ProcessSheet {
    const now = new Date();
    const id = UniqueEntityID.createObjectId().toPrimitive();
    const code = this.generateCode(primitives.processTypeId, primitives.processNameId);

    const props: ProcessSheetProps = {
      id,
      code,
      name: primitives.name.trim(),
      processTypeId: primitives.processTypeId,
      processNameId: primitives.processNameId,
      version: 1,
      status: ProcessStatus.BORRADOR,
      responsible: primitives.responsible.trim(),
      lastUpdate: now,
      indicatorIds: [],
      documentIds: [],
      riskIds: [],
      opportunityIds: [],
      equipmentIds: [],
      supplierIds: [],
      createdAt: now,
      updatedAt: now,
    };

    this.validateProcessSheet(props);

    return new ProcessSheet(props);
  }

  static fromPrimitives(props: ProcessSheetProps): ProcessSheet {
    return new ProcessSheet(props);
  }

  private static generateCode(processTypeId: string, processNameId: string): string {
    const timestamp = Date.now().toString(36);
    return `PROC-${processTypeId.slice(-4)}-${processNameId.slice(-4)}-${timestamp}`.toUpperCase();
  }

  private static validateProcessSheet(props: ProcessSheetProps): void {
    if (!props.name || props.name.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    if (!props.processTypeId || props.processTypeId.trim().length === 0) {
      throw new Error('El ID del tipo de proceso es requerido');
    }

    if (!props.processNameId || props.processNameId.trim().length === 0) {
      throw new Error('El ID del nombre de proceso es requerido');
    }

    if (!props.responsible || props.responsible.trim().length === 0) {
      throw new Error('El responsable es requerido');
    }

    if (props.version < 1) {
      throw new Error('La versión debe ser mayor a 0');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get code(): string {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get processTypeId(): string {
    return this.props.processTypeId;
  }

  get processNameId(): string {
    return this.props.processNameId;
  }

  get version(): number {
    return this.props.version;
  }

  get status(): ProcessStatus {
    return this.props.status;
  }

  get responsible(): string {
    return this.props.responsible;
  }

  get lastUpdate(): Date {
    return this.props.lastUpdate;
  }

  get indicatorIds(): string[] {
    return [...this.props.indicatorIds];
  }

  get documentIds(): string[] {
    return [...this.props.documentIds];
  }

  get riskIds(): string[] {
    return [...this.props.riskIds];
  }

  get opportunityIds(): string[] {
    return [...this.props.opportunityIds];
  }

  get equipmentIds(): string[] {
    return [...this.props.equipmentIds];
  }

  get supplierIds(): string[] {
    return [...this.props.supplierIds];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  updateInfo(updates: Partial<CreateProcessSheetPrimitives>): void {
    if (this.props.status === ProcessStatus.AUTORIZADO) {
      throw new Error('No se puede editar una ficha autorizada. Debe crear una nueva versión.');
    }

    if (updates.name) {
      this.props.name = updates.name.trim();
    }
    if (updates.responsible) {
      this.props.responsible = updates.responsible.trim();
    }

    this.props.lastUpdate = new Date();
    this.props.updatedAt = new Date();
    ProcessSheet.validateProcessSheet(this.props);
  }

  authorize(): void {
    if (this.props.status !== ProcessStatus.BORRADOR) {
      throw new Error('Solo se pueden autorizar fichas en estado BORRADOR');
    }

    this.props.status = ProcessStatus.AUTORIZADO;
    this.props.lastUpdate = new Date();
    this.props.updatedAt = new Date();
  }

  archive(): void {
    if (this.props.status !== ProcessStatus.AUTORIZADO) {
      throw new Error('Solo se pueden archivar fichas autorizadas');
    }

    this.props.status = ProcessStatus.ARCHIVADO;
    this.props.lastUpdate = new Date();
    this.props.updatedAt = new Date();
  }

  sendToDraft(): void {
    if (this.props.status === ProcessStatus.ARCHIVADO) {
      throw new Error('No se puede volver a borrador una ficha archivada');
    }

    this.props.status = ProcessStatus.BORRADOR;
    this.props.lastUpdate = new Date();
    this.props.updatedAt = new Date();
  }

  incrementVersion(): void {
    this.props.version += 1;
    this.props.status = ProcessStatus.BORRADOR;
    this.props.lastUpdate = new Date();
    this.props.updatedAt = new Date();
  }

  linkIndicator(indicatorId: string): void {
    if (!indicatorId || indicatorId.trim().length === 0) {
      throw new Error('El ID del indicador es requerido');
    }

    if (this.props.indicatorIds.includes(indicatorId)) {
      throw new Error('El indicador ya está vinculado a esta ficha');
    }

    this.props.indicatorIds.push(indicatorId);
    this.props.updatedAt = new Date();
  }

  unlinkIndicator(indicatorId: string): void {
    const index = this.props.indicatorIds.indexOf(indicatorId);
    if (index === -1) {
      throw new Error('El indicador no está vinculado a esta ficha');
    }

    this.props.indicatorIds.splice(index, 1);
    this.props.updatedAt = new Date();
  }

  linkDocument(documentId: string): void {
    if (!documentId || documentId.trim().length === 0) {
      throw new Error('El ID del documento es requerido');
    }

    if (this.props.documentIds.includes(documentId)) {
      throw new Error('El documento ya está vinculado a esta ficha');
    }

    this.props.documentIds.push(documentId);
    this.props.updatedAt = new Date();
  }

  unlinkDocument(documentId: string): void {
    const index = this.props.documentIds.indexOf(documentId);
    if (index === -1) {
      throw new Error('El documento no está vinculado a esta ficha');
    }

    this.props.documentIds.splice(index, 1);
    this.props.updatedAt = new Date();
  }

  linkRisk(riskId: string): void {
    if (!riskId || riskId.trim().length === 0) {
      throw new Error('El ID del riesgo es requerido');
    }

    if (this.props.riskIds.includes(riskId)) {
      throw new Error('El riesgo ya está vinculado a esta ficha');
    }

    this.props.riskIds.push(riskId);
    this.props.updatedAt = new Date();
  }

  unlinkRisk(riskId: string): void {
    const index = this.props.riskIds.indexOf(riskId);
    if (index === -1) {
      throw new Error('El riesgo no está vinculado a esta ficha');
    }

    this.props.riskIds.splice(index, 1);
    this.props.updatedAt = new Date();
  }

  linkOpportunity(opportunityId: string): void {
    if (!opportunityId || opportunityId.trim().length === 0) {
      throw new Error('El ID de la oportunidad es requerido');
    }

    if (this.props.opportunityIds.includes(opportunityId)) {
      throw new Error('La oportunidad ya está vinculada a esta ficha');
    }

    this.props.opportunityIds.push(opportunityId);
    this.props.updatedAt = new Date();
  }

  unlinkOpportunity(opportunityId: string): void {
    const index = this.props.opportunityIds.indexOf(opportunityId);
    if (index === -1) {
      throw new Error('La oportunidad no está vinculada a esta ficha');
    }

    this.props.opportunityIds.splice(index, 1);
    this.props.updatedAt = new Date();
  }

  linkEquipment(equipmentId: string): void {
    if (!equipmentId || equipmentId.trim().length === 0) {
      throw new Error('El ID del equipo es requerido');
    }

    if (this.props.equipmentIds.includes(equipmentId)) {
      throw new Error('El equipo ya está vinculado a esta ficha');
    }

    this.props.equipmentIds.push(equipmentId);
    this.props.updatedAt = new Date();
  }

  unlinkEquipment(equipmentId: string): void {
    const index = this.props.equipmentIds.indexOf(equipmentId);
    if (index === -1) {
      throw new Error('El equipo no está vinculado a esta ficha');
    }

    this.props.equipmentIds.splice(index, 1);
    this.props.updatedAt = new Date();
  }

  linkSupplier(supplierId: string): void {
    if (!supplierId || supplierId.trim().length === 0) {
      throw new Error('El ID del proveedor es requerido');
    }

    if (this.props.supplierIds.includes(supplierId)) {
      throw new Error('El proveedor ya está vinculado a esta ficha');
    }

    this.props.supplierIds.push(supplierId);
    this.props.updatedAt = new Date();
  }

  unlinkSupplier(supplierId: string): void {
    const index = this.props.supplierIds.indexOf(supplierId);
    if (index === -1) {
      throw new Error('El proveedor no está vinculado a esta ficha');
    }

    this.props.supplierIds.splice(index, 1);
    this.props.updatedAt = new Date();
  }

  getFullName(): string {
    // Este método se completará cuando tengamos acceso a ProcessType y ProcessName
    return `${this.props.processTypeId} > ${this.props.processNameId}`;
  }

  toPrimitives(): ProcessSheetProps {
    return { ...this.props };
  }
}
