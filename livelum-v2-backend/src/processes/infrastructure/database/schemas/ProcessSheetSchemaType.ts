import { Document } from 'mongoose';
import { ProcessStatus } from '../../../domain/enums/ProcessEnums';

export interface ProcessSheetDocument extends Document {
  _id: string;
  code: string;
  name: string;
  processTypeId: string;
  processNameId: string;
  version: number;
  status: ProcessStatus;
  responsible: string;
  lastUpdate: Date;
  indicatorIds: string[];
  documentIds: string[];
  riskIds: string[];
  opportunityIds: string[];
  equipmentIds: string[];
  supplierIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
