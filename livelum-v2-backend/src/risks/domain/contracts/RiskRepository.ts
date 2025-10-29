import { Risk } from '../entities/Risk';
import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../enums/RiskEnums';

export interface RiskSearchCriteria {
  title?: string;
  code?: string;
  category?: RiskCategory;
  probability?: RiskProbability;
  impact?: RiskImpact;
  riskLevel?: RiskLevel;
  status?: RiskStatus;
  owner?: string;
  isOverdue?: boolean;
  isCritical?: boolean;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'title' | 'code' | 'riskLevel' | 'dueDate' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface RiskStats {
  total: number;
  byStatus: Record<RiskStatus, number>;
  byLevel: Record<RiskLevel, number>;
  byCategory: Record<RiskCategory, number>;
  overdue: number;
  critical: number;
  highRisk: number;
}

export interface RiskRepository {
  save(risk: Risk): Promise<void>;
  findById(id: string): Promise<Risk | null>;
  findByCode(code: string): Promise<Risk | null>;
  findByCriteria(criteria: RiskSearchCriteria): Promise<Risk[]>;
  findAll(): Promise<Risk[]>;
  update(risk: Risk): Promise<void>;
  delete(id: string): Promise<void>;
  countByStatus(status: RiskStatus): Promise<number>;
  countByLevel(level: RiskLevel): Promise<number>;
  countByCategory(category: RiskCategory): Promise<number>;
  countByProbability(probability: RiskProbability): Promise<number>;
  countByImpact(impact: RiskImpact): Promise<number>;
  countOverdue(): Promise<number>;
  countCritical(): Promise<number>;
  getStats(): Promise<RiskStats>;
  findOverdue(): Promise<Risk[]>;
  findCritical(): Promise<Risk[]>;
  findHighRisk(): Promise<Risk[]>;
}
