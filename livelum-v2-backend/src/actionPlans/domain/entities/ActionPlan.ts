import { ActionPlanOriginType, ActionPlanStatus } from '../enums/ActionPlanEnums';
import { PlanAction, PlanActionProps } from '../valueObjects/PlanAction';
import { PlanControl, PlanControlProps } from '../valueObjects/PlanControl';
import { UniqueEntityID } from '../../../cross-cutting/domain/valueObjects/UniqueEntityID';

export interface ActionPlanProps {
  id: string;
  createdDate: Date;
  originType: ActionPlanOriginType;
  originDescription: string;
  originId?: string;
  status: ActionPlanStatus;
  actions: PlanActionProps[];
  controls: PlanControlProps[];
  completionPercentage: number;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateActionPlanPrimitives {
  createdDate: Date;
  originType: ActionPlanOriginType;
  originDescription: string;
  originId?: string;
  companyId: string;
  createdBy: string;
}

export class ActionPlan {
  private actionVOs: PlanAction[];
  private controlVOs: PlanControl[];

  private constructor(private readonly props: ActionPlanProps) {
    this.actionVOs = props.actions.map(a => PlanAction.fromPrimitives(a));
    this.controlVOs = props.controls.map(c => PlanControl.fromPrimitives(c));
    this.validate();
  }

  static create(primitives: CreateActionPlanPrimitives): ActionPlan {
    const now = new Date();
    
    return new ActionPlan({
      id: UniqueEntityID.create().value,
      createdDate: primitives.createdDate,
      originType: primitives.originType,
      originDescription: primitives.originDescription,
      originId: primitives.originId,
      status: ActionPlanStatus.PENDING,
      actions: [],
      controls: [],
      completionPercentage: 0,
      companyId: primitives.companyId,
      createdBy: primitives.createdBy,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPrimitives(primitives: ActionPlanProps): ActionPlan {
    return new ActionPlan(primitives);
  }

  private validate(): void {
    if (!this.props.originDescription || this.props.originDescription.trim().length === 0) {
      throw new Error('La descripción del origen es requerida');
    }
    if (!this.props.companyId || this.props.companyId.trim().length === 0) {
      throw new Error('El ID de la compañía es requerido');
    }
    if (!this.props.createdBy || this.props.createdBy.trim().length === 0) {
      throw new Error('El creador es requerido');
    }
  }

  update(data: Partial<CreateActionPlanPrimitives>): void {
    if (data.originDescription !== undefined) {
      this.props.originDescription = data.originDescription;
    }
    if (data.originType !== undefined) {
      this.props.originType = data.originType;
    }
    if (data.originId !== undefined) {
      this.props.originId = data.originId;
    }
    
    this.props.updatedAt = new Date();
    this.validate();
  }

  addAction(action: PlanAction): void {
    this.actionVOs.push(action);
    this.props.actions.push(action.toPrimitives());
    this.updateCompletionAndStatus();
    this.props.updatedAt = new Date();
  }

  updateAction(actionId: string, updates: Partial<PlanActionProps>): void {
    const action = this.actionVOs.find(a => a.id === actionId);
    if (!action) {
      throw new Error(`Acción no encontrada con ID: ${actionId}`);
    }

    const index = this.props.actions.findIndex(a => a.id === actionId);
    if (index >= 0 && this.props.actions[index]) {
      const currentAction = this.props.actions[index];
      const updatedAction: PlanActionProps = {
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
      this.actionVOs[index] = PlanAction.fromPrimitives(updatedAction);
      this.updateCompletionAndStatus();
      this.props.updatedAt = new Date();
    }
  }

  addControl(control: PlanControl): void {
    this.controlVOs.push(control);
    this.props.controls.push(control.toPrimitives());
    this.props.updatedAt = new Date();
  }

  updateControl(controlId: string, updates: Partial<PlanControlProps>): void {
    const control = this.controlVOs.find(c => c.id === controlId);
    if (!control) {
      throw new Error(`Control no encontrado con ID: ${controlId}`);
    }

    const index = this.props.controls.findIndex(c => c.id === controlId);
    if (index >= 0 && this.props.controls[index]) {
      const currentControl = this.props.controls[index];
      const updatedControl: PlanControlProps = {
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
      this.controlVOs[index] = PlanControl.fromPrimitives(updatedControl);
      this.props.updatedAt = new Date();
    }
  }

  private updateCompletionAndStatus(): void {
    if (this.actionVOs.length === 0) {
      this.props.completionPercentage = 0;
      this.props.status = ActionPlanStatus.PENDING;
      return;
    }

    const completedActions = this.actionVOs.filter(a => a.status === 'COMPLETED').length;
    this.props.completionPercentage = Math.round((completedActions / this.actionVOs.length) * 100);

    if (this.props.completionPercentage === 100) {
      this.props.status = ActionPlanStatus.COMPLETED;
    } else if (this.props.completionPercentage > 0) {
      this.props.status = ActionPlanStatus.IN_PROGRESS;
    } else if (this.hasOverdueActions()) {
      this.props.status = ActionPlanStatus.OVERDUE;
    } else {
      this.props.status = ActionPlanStatus.PENDING;
    }
  }

  complete(): void {
    this.props.status = ActionPlanStatus.COMPLETED;
    this.props.completionPercentage = 100;
    this.props.updatedAt = new Date();
  }

  cancel(reason?: string): void {
    this.props.status = ActionPlanStatus.CANCELLED;
    if (reason) {
      this.props.originDescription += `\n\nCancelado: ${reason}`;
    }
    this.props.updatedAt = new Date();
  }

  isPending(): boolean {
    return this.props.status === ActionPlanStatus.PENDING;
  }

  isInProgress(): boolean {
    return this.props.status === ActionPlanStatus.IN_PROGRESS;
  }

  isCompleted(): boolean {
    return this.props.status === ActionPlanStatus.COMPLETED;
  }

  isOverdue(): boolean {
    return this.props.status === ActionPlanStatus.OVERDUE;
  }

  hasOverdueActions(): boolean {
    return this.actionVOs.some(a => a.isOverdue());
  }

  hasOverdueControls(): boolean {
    return this.controlVOs.some(c => c.isOverdue());
  }

  getCompletionPercentage(): number {
    return this.props.completionPercentage;
  }

  toPrimitives(): ActionPlanProps {
    return { 
      ...this.props,
      actions: this.actionVOs.map(a => a.toPrimitives()),
      controls: this.controlVOs.map(c => c.toPrimitives()),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): ActionPlanStatus {
    return this.props.status;
  }

  get originType(): ActionPlanOriginType {
    return this.props.originType;
  }

  get companyId(): string {
    return this.props.companyId;
  }
}

