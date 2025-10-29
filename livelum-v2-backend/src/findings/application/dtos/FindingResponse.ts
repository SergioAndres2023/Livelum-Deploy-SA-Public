import { FindingOrigin, FindingType, FindingStatus } from '../../domain/enums/FindingEnums';
import { FindingActionProps } from '../../domain/valueObjects/FindingAction';
import { FindingControlProps } from '../../domain/valueObjects/FindingControl';

export interface FindingResponse {
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
  isOpen: boolean;
  isInProgress: boolean;
  isClosed: boolean;
  hasOverdueActions: boolean;
  hasOverdueControls: boolean;
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}
