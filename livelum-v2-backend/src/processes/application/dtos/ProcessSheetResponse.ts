import { ProcessStatus } from '../../domain/enums/ProcessEnums';

export interface ProcessSheetResponse {
  id: string;
  code: string;
  name: string;
  processTypeId: string;
  processNameId: string;
  version: number;
  status: ProcessStatus;
  responsible: string;
  lastUpdate: string;
  indicatorIds: string[];
  documentIds: string[];
  riskIds: string[];
  opportunityIds: string[];
  equipmentIds: string[];
  supplierIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProcessSheetStatsResponse {
  total: number;
  byStatus: {
    borrador: number;
    autorizado: number;
    archivado: number;
  };
  byProcessType: Array<{
    processTypeId: string;
    count: number;
  }>;
  recentUpdates: number;
}
