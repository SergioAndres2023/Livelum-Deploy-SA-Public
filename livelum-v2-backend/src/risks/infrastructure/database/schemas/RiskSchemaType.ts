import { Document } from 'mongoose';
import { RiskCategory, RiskProbability, RiskImpact, RiskLevel, RiskStatus } from '../../../domain/enums/RiskEnums';

export interface RiskDocument extends Document {
  _id: string;
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
