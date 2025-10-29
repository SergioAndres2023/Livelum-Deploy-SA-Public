import { FindingOrigin, FindingType, FindingStatus } from '../enums/FindingEnums';
import { FindingAction, FindingActionProps } from '../valueObjects/FindingAction';
import { FindingControl, FindingControlProps } from '../valueObjects/FindingControl';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface FindingProps {
  id: string;
  detectionDate: Date;
  emissionDate: Date;
  summary: string;
  description: string;
  processId: string;
  processName: string;
  origin: FindingOrigin;
  type: FindingType;
  status: FindingStatus;
  containmentActions?: string;
  causeAnalysis?: string;
  causeAnalysisDate?: Date;
  relatedFindings?: string[];
  relatedAudits?: string[];
  performedBy: string;
  involvedActors?: string[];
  actions: FindingActionProps[];
  controls: FindingControlProps[];
  companyId: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFindingPrimitives {
  detectionDate: Date;
  emissionDate: Date;
  summary: string;
  description: string;
  processId: string;
  processName: string;
  origin: FindingOrigin;
  type: FindingType;
  containmentActions?: string;
  causeAnalysis?: string;
  causeAnalysisDate?: Date;
  relatedFindings?: string[];
  relatedAudits?: string[];
  performedBy: string;
  involvedActors?: string[];
  companyId: string;
}

export class Finding {
  private actionVOs: FindingAction[];
  private controlVOs: FindingControl[];

  private constructor(private readonly props: FindingProps) {
    this.actionVOs = props.actions.map(a => FindingAction.fromPrimitives(a));
    this.controlVOs = props.controls.map(c => FindingControl.fromPrimitives(c));
    this.validate();
  }

  static create(primitives: CreateFindingPrimitives): Finding {
    const now = new Date();
    
    return new Finding({
      id: UniqueEntityID.create().value,
      detectionDate: primitives.detectionDate,
      emissionDate: primitives.emissionDate,
      summary: primitives.summary,
      description: primitives.description,
      processId: primitives.processId,
      processName: primitives.processName,
      origin: primitives.origin,
      type: primitives.type,
      status: FindingStatus.OPEN,
      containmentActions: primitives.containmentActions,
      causeAnalysis: primitives.causeAnalysis,
      causeAnalysisDate: primitives.causeAnalysisDate,
      relatedFindings: primitives.relatedFindings || [],
      relatedAudits: primitives.relatedAudits || [],
      performedBy: primitives.performedBy,
      involvedActors: primitives.involvedActors || [],
      actions: [],
      controls: [],
      companyId: primitives.companyId,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: FindingProps): Finding {
    return new Finding(primitives);
  }

  private validate(): void {
    if (!this.props.summary || this.props.summary.trim().length === 0) {
      throw new Error('El resumen es requerido');
    }
    if (!this.props.description || this.props.description.trim().length === 0) {
      throw new Error('La descripción es requerida');
    }
    if (!this.props.processId || this.props.processId.trim().length === 0) {
      throw new Error('El proceso es requerido');
    }
    if (!this.props.performedBy || this.props.performedBy.trim().length === 0) {
      throw new Error('La persona que realiza el hallazgo es requerida');
    }
  }

  update(data: Partial<CreateFindingPrimitives>): void {
    if (data.summary !== undefined) this.props.summary = data.summary;
    if (data.description !== undefined) this.props.description = data.description;
    if (data.processId !== undefined) this.props.processId = data.processId;
    if (data.processName !== undefined) this.props.processName = data.processName;
    if (data.origin !== undefined) this.props.origin = data.origin;
    if (data.type !== undefined) this.props.type = data.type;
    if (data.containmentActions !== undefined) this.props.containmentActions = data.containmentActions;
    if (data.causeAnalysis !== undefined) this.props.causeAnalysis = data.causeAnalysis;
    if (data.causeAnalysisDate !== undefined) this.props.causeAnalysisDate = data.causeAnalysisDate;
    if (data.relatedFindings !== undefined) this.props.relatedFindings = data.relatedFindings;
    if (data.relatedAudits !== undefined) this.props.relatedAudits = data.relatedAudits;
    if (data.involvedActors !== undefined) this.props.involvedActors = data.involvedActors;
    
    this.props.version += 1;
    this.props.updatedAt = new Date();
    this.validate();
  }

  addAction(action: FindingAction): void {
    this.actionVOs.push(action);
    this.props.actions.push(action.toPrimitives());
    this.updateStatus();
    this.props.updatedAt = new Date();
  }

  updateAction(actionId: string, updates: Partial<FindingActionProps>): void {
    const action = this.actionVOs.find(a => a.id === actionId);
    if (!action) {
      throw new Error(`Acción no encontrada con ID: ${actionId}`);
    }

    const index = this.props.actions.findIndex(a => a.id === actionId);
    if (index >= 0 && this.props.actions[index]) {
      const currentAction = this.props.actions[index];
      const updatedAction: FindingActionProps = {
        id: currentAction.id,
        description: updates.description ?? currentAction.description,
        responsible: updates.responsible ?? currentAction.responsible,
        plannedDate: updates.plannedDate ?? currentAction.plannedDate,
        status: updates.status ?? currentAction.status,
        completionDate: updates.completionDate ?? currentAction.completionDate,
        evidence: updates.evidence ?? currentAction.evidence,
        comments: updates.comments ?? currentAction.comments,
      };
      this.props.actions[index] = updatedAction;
      this.updateStatus();
      this.props.updatedAt = new Date();
    }
  }

  addControl(control: FindingControl): void {
    this.controlVOs.push(control);
    this.props.controls.push(control.toPrimitives());
    this.props.updatedAt = new Date();
  }

  updateControl(controlId: string, updates: Partial<FindingControlProps>): void {
    const control = this.controlVOs.find(c => c.id === controlId);
    if (!control) {
      throw new Error(`Control no encontrado con ID: ${controlId}`);
    }

    const index = this.props.controls.findIndex(c => c.id === controlId);
    if (index >= 0 && this.props.controls[index]) {
      const currentControl = this.props.controls[index];
      const updatedControl: FindingControlProps = {
        id: currentControl.id,
        description: updates.description ?? currentControl.description,
        estimatedDate: updates.estimatedDate ?? currentControl.estimatedDate,
        status: updates.status ?? currentControl.status,
        actualDate: updates.actualDate ?? currentControl.actualDate,
        responsible: updates.responsible ?? currentControl.responsible,
        result: updates.result ?? currentControl.result,
        comments: updates.comments ?? currentControl.comments,
      };
      this.props.controls[index] = updatedControl;
      this.props.updatedAt = new Date();
    }
  }

  private updateStatus(): void {
    if (this.props.status === FindingStatus.CLOSED || this.props.status === FindingStatus.CANCELLED) {
      return;
    }

    const allActionsCompleted = this.actionVOs.length > 0 && 
      this.actionVOs.every(a => a.status === 'COMPLETED');

    if (allActionsCompleted) {
      this.props.status = FindingStatus.PENDING_VERIFICATION;
    } else if (this.actionVOs.some(a => a.status === 'IN_PROGRESS')) {
      this.props.status = FindingStatus.IN_PROGRESS;
    }
  }

  markAsVerified(): void {
    this.props.status = FindingStatus.VERIFIED;
    this.props.updatedAt = new Date();
  }

  close(): void {
    this.props.status = FindingStatus.CLOSED;
    this.props.updatedAt = new Date();
  }

  cancel(reason?: string): void {
    this.props.status = FindingStatus.CANCELLED;
    if (reason) {
      this.props.description += `\n\nCancelado: ${reason}`;
    }
    this.props.updatedAt = new Date();
  }

  isOpen(): boolean {
    return this.props.status === FindingStatus.OPEN;
  }

  isInProgress(): boolean {
    return this.props.status === FindingStatus.IN_PROGRESS;
  }

  isClosed(): boolean {
    return this.props.status === FindingStatus.CLOSED;
  }

  hasOverdueActions(): boolean {
    return this.actionVOs.some(a => a.isOverdue());
  }

  hasOverdueControls(): boolean {
    return this.controlVOs.some(c => c.isOverdue());
  }

  getCompletionPercentage(): number {
    if (this.actionVOs.length === 0) return 0;
    const completed = this.actionVOs.filter(a => a.status === 'COMPLETED').length;
    return Math.round((completed / this.actionVOs.length) * 100);
  }

  toPrimitives(): FindingProps {
    return { 
      ...this.props,
      actions: this.actionVOs.map(a => a.toPrimitives()),
      controls: this.controlVOs.map(c => c.toPrimitives()),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): FindingStatus {
    return this.props.status;
  }

  get type(): FindingType {
    return this.props.type;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}

