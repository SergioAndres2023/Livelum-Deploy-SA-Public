import { IndicatorCategory, IndicatorType, IndicatorTrend, IndicatorStatus, IndicatorFrequency } from '../enums/IndicatorEnums';
import { UniqueEntityID } from '../../../../src/cross-cutting/domain/valueObjects/UniqueEntityID';

export interface IndicatorProps {
  name: string;
  code: string;
  category: IndicatorCategory;
  type: IndicatorType;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: IndicatorTrend;
  status: IndicatorStatus;
  owner: string;
  lastUpdate: Date;
  frequency: IndicatorFrequency;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Indicator {
  private constructor(
    private props: IndicatorProps,
    private readonly _id: UniqueEntityID
  ) {}

  static create(props: Omit<IndicatorProps, 'trend' | 'status' | 'createdAt' | 'updatedAt'>, id?: string): Indicator {
    const now = new Date();
    const trend = Indicator.calculateTrend(props.currentValue, props.targetValue);
    const status = Indicator.calculateStatus(props.currentValue, props.targetValue, props.type);
    
    return new Indicator(
      {
        ...props,
        trend,
        status,
        createdAt: now,
        updatedAt: now,
      },
      id ? new UniqueEntityID(id) : new UniqueEntityID()
    );
  }

  static restore(props: IndicatorProps, id: string): Indicator {
    return new Indicator(props, new UniqueEntityID(id));
  }

  // Getters
  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get code(): string {
    return this.props.code;
  }

  get category(): IndicatorCategory {
    return this.props.category;
  }

  get type(): IndicatorType {
    return this.props.type;
  }

  get currentValue(): number {
    return this.props.currentValue;
  }

  get targetValue(): number {
    return this.props.targetValue;
  }

  get unit(): string {
    return this.props.unit;
  }

  get trend(): IndicatorTrend {
    return this.props.trend;
  }

  get status(): IndicatorStatus {
    return this.props.status;
  }

  get owner(): string {
    return this.props.owner;
  }

  get lastUpdate(): Date {
    return this.props.lastUpdate;
  }

  get frequency(): IndicatorFrequency {
    return this.props.frequency;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateValue(newValue: number): void {
    this.props.currentValue = newValue;
    this.props.lastUpdate = new Date();
    this.props.updatedAt = new Date();
    
    // Recalcular trend y status
    this.props.trend = Indicator.calculateTrend(newValue, this.props.targetValue);
    this.props.status = Indicator.calculateStatus(newValue, this.props.targetValue, this.props.type);
  }

  updateTarget(newTarget: number): void {
    this.props.targetValue = newTarget;
    this.props.updatedAt = new Date();
    
    // Recalcular trend y status
    this.props.trend = Indicator.calculateTrend(this.props.currentValue, newTarget);
    this.props.status = Indicator.calculateStatus(this.props.currentValue, newTarget, this.props.type);
  }

  updateInfo(data: {
    name?: string;
    category?: IndicatorCategory;
    type?: IndicatorType;
    unit?: string;
    owner?: string;
    frequency?: IndicatorFrequency;
    description?: string;
  }): void {
    if (data.name !== undefined) this.props.name = data.name;
    if (data.category !== undefined) this.props.category = data.category;
    if (data.type !== undefined) this.props.type = data.type;
    if (data.unit !== undefined) this.props.unit = data.unit;
    if (data.owner !== undefined) this.props.owner = data.owner;
    if (data.frequency !== undefined) this.props.frequency = data.frequency;
    if (data.description !== undefined) this.props.description = data.description;

    this.props.updatedAt = new Date();
  }

  isAboveTarget(): boolean {
    return this.props.currentValue > this.props.targetValue;
  }

  isBelowTarget(): boolean {
    return this.props.currentValue < this.props.targetValue;
  }

  isOnTarget(): boolean {
    return this.props.currentValue === this.props.targetValue;
  }

  getProgressPercentage(): number {
    if (this.props.targetValue === 0) return 0;
    return Math.min((this.props.currentValue / this.props.targetValue) * 100, 100);
  }

  isCritical(): boolean {
    return this.props.status === IndicatorStatus.CRITICAL;
  }

  isWarning(): boolean {
    return this.props.status === IndicatorStatus.WARNING;
  }

  isGood(): boolean {
    return this.props.status === IndicatorStatus.GOOD;
  }

  // Static methods to calculate trend and status
  static calculateTrend(currentValue: number, targetValue: number): IndicatorTrend {
    if (currentValue > targetValue) return IndicatorTrend.UP;
    if (currentValue < targetValue) return IndicatorTrend.DOWN;
    return IndicatorTrend.STABLE;
  }

  static calculateStatus(currentValue: number, targetValue: number, type: IndicatorType): IndicatorStatus {
    const percentage = targetValue === 0 ? 0 : (currentValue / targetValue) * 100;
    
    // Lógica específica por tipo de indicador
    switch (type) {
      case IndicatorType.PORCENTAJE:
        if (percentage >= 90) return IndicatorStatus.GOOD;
        if (percentage >= 70) return IndicatorStatus.WARNING;
        return IndicatorStatus.CRITICAL;
        
      case IndicatorType.TIEMPO:
        // Para tiempo, menor es mejor
        if (percentage <= 100) return IndicatorStatus.GOOD;
        if (percentage <= 120) return IndicatorStatus.WARNING;
        return IndicatorStatus.CRITICAL;
        
      case IndicatorType.NUMERICO:
        if (percentage >= 95) return IndicatorStatus.GOOD;
        if (percentage >= 80) return IndicatorStatus.WARNING;
        return IndicatorStatus.CRITICAL;
        
      case IndicatorType.MONETARIO:
        if (percentage >= 90) return IndicatorStatus.GOOD;
        if (percentage >= 70) return IndicatorStatus.WARNING;
        return IndicatorStatus.CRITICAL;
        
      case IndicatorType.RATIO:
        if (percentage >= 95) return IndicatorStatus.GOOD;
        if (percentage >= 85) return IndicatorStatus.WARNING;
        return IndicatorStatus.CRITICAL;
        
      case IndicatorType.INDICE:
        if (percentage >= 90) return IndicatorStatus.GOOD;
        if (percentage >= 75) return IndicatorStatus.WARNING;
        return IndicatorStatus.CRITICAL;
        
      default:
        return IndicatorStatus.WARNING;
    }
  }

  toPrimitives(): IndicatorProps & { id: string } {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
