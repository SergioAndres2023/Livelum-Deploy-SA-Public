import { FindingOrigin, FindingType } from '../../domain/enums/FindingEnums';

export interface CreateFindingRequest {
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
