import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../enums/RiskEnums';
import { UniqueEntityID } from '../../../../src/cross-cutting/domain/valueObjects/UniqueEntityID';

export interface RiskProps {
  title: string;
  code: string;
  category: RiskCategory;
  probability: RiskProbability;
  impact: RiskImpact;
  riskLevel: RiskLevel;
  status: RiskStatus;
  owner: string;
  dueDate: Date;
  description: string;
  mitigation: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Risk {
  private constructor(
    private props: RiskProps,
    private readonly _id: UniqueEntityID
  ) {}

  static create(props: Omit<RiskProps, 'riskLevel' | 'status' | 'createdAt' | 'updatedAt'>, id?: string): Risk {
    const now = new Date();
    const riskLevel = Risk.calculateRiskLevel(props.probability, props.impact);
    
    return new Risk(
      {
        ...props,
        riskLevel,
        status: RiskStatus.ACTIVE,
        createdAt: now,
        updatedAt: now,
      },
      id ? new UniqueEntityID(id) : new UniqueEntityID()
    );
  }

  static restore(props: RiskProps, id: string): Risk {
    return new Risk(props, new UniqueEntityID(id));
  }

  // Getters
  get id(): string {
    return this._id.toString();
  }

  get title(): string {
    return this.props.title;
  }

  get code(): string {
    return this.props.code;
  }

  get category(): RiskCategory {
    return this.props.category;
  }

  get probability(): RiskProbability {
    return this.props.probability;
  }

  get impact(): RiskImpact {
    return this.props.impact;
  }

  get riskLevel(): RiskLevel {
    return this.props.riskLevel;
  }

  get status(): RiskStatus {
    return this.props.status;
  }

  get owner(): string {
    return this.props.owner;
  }

  get dueDate(): Date {
    return this.props.dueDate;
  }

  get description(): string {
    return this.props.description;
  }

  get mitigation(): string {
    return this.props.mitigation;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateInfo(data: {
    title?: string;
    category?: RiskCategory;
    probability?: RiskProbability;
    impact?: RiskImpact;
    owner?: string;
    dueDate?: Date;
    description?: string;
    mitigation?: string;
  }): void {
    if (data.title !== undefined) this.props.title = data.title;
    if (data.category !== undefined) this.props.category = data.category;
    if (data.probability !== undefined) this.props.probability = data.probability;
    if (data.impact !== undefined) this.props.impact = data.impact;
    if (data.owner !== undefined) this.props.owner = data.owner;
    if (data.dueDate !== undefined) this.props.dueDate = data.dueDate;
    if (data.description !== undefined) this.props.description = data.description;
    if (data.mitigation !== undefined) this.props.mitigation = data.mitigation;

    // Recalcular nivel de riesgo si cambió probabilidad o impacto
    if (data.probability !== undefined || data.impact !== undefined) {
      this.props.riskLevel = Risk.calculateRiskLevel(this.props.probability, this.props.impact);
    }

    this.props.updatedAt = new Date();
  }

  changeStatus(newStatus: RiskStatus): void {
    this.props.status = newStatus;
    this.props.updatedAt = new Date();
  }

  isOverdue(): boolean {
    return this.props.dueDate < new Date() && this.props.status !== RiskStatus.CLOSED;
  }

  isCritical(): boolean {
    return this.props.riskLevel === RiskLevel.CRITICO;
  }

  isHighRisk(): boolean {
    return this.props.riskLevel === RiskLevel.ALTO || this.props.riskLevel === RiskLevel.CRITICO;
  }

  // Static method to calculate risk level
  static calculateRiskLevel(probability: RiskProbability, impact: RiskImpact): RiskLevel {
    const probabilityScore = this.getProbabilityScore(probability);
    const impactScore = this.getImpactScore(impact);
    const totalScore = probabilityScore * impactScore;

    if (totalScore >= 9) return RiskLevel.CRITICO;
    if (totalScore >= 6) return RiskLevel.ALTO;
    if (totalScore >= 3) return RiskLevel.MEDIO;
    return RiskLevel.BAJO;
  }

  private static getProbabilityScore(probability: RiskProbability): number {
    switch (probability) {
      case RiskProbability.BAJA: return 1;
      case RiskProbability.MEDIA: return 2;
      case RiskProbability.ALTA: return 3;
      default: return 1;
    }
  }

  private static getImpactScore(impact: RiskImpact): number {
    switch (impact) {
      case RiskImpact.BAJO: return 1;
      case RiskImpact.MEDIO: return 2;
      case RiskImpact.ALTO: return 3;
      default: return 1;
    }
  }

  toPrimitives(): RiskProps & { id: string } {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
