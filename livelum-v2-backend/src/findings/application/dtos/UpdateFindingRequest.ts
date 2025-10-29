import { FindingOrigin, FindingType } from '../../domain/enums/FindingEnums';

export interface UpdateFindingRequest {
  summary?: string;
  description?: string;
  processId?: string;
  processName?: string;
  origin?: FindingOrigin;
  type?: FindingType;
  containmentActions?: string;
  causeAnalysis?: string;
  causeAnalysisDate?: Date;
  relatedFindings?: string[];
  relatedAudits?: string[];
  involvedActors?: string[];
}
