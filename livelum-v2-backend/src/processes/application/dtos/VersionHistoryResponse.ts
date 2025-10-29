import { ProcessStatus } from '../../domain/enums/ProcessEnums';

export interface VersionHistoryResponse {
  id: string;
  code: string;
  name: string;
  version: number;
  status: ProcessStatus;
  responsible: string;
  lastUpdate: string;
  createdAt: string;
  updatedAt: string;
}
