import { Schema } from 'mongoose';
import { ProcessSheetDocument } from './ProcessSheetSchemaType';
import { ProcessStatus } from '../../../domain/enums/ProcessEnums';

export const ProcessSheetSchema = new Schema<ProcessSheetDocument>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  processTypeId: {
    type: String,
    required: true,
    ref: 'ProcessType',
  },
  processNameId: {
    type: String,
    required: true,
    ref: 'ProcessName',
  },
  version: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(ProcessStatus),
    default: ProcessStatus.BORRADOR,
  },
  responsible: {
    type: String,
    required: true,
    trim: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  indicatorIds: {
    type: [String],
    default: [],
  },
  documentIds: {
    type: [String],
    default: [],
  },
  riskIds: {
    type: [String],
    default: [],
  },
  opportunityIds: {
    type: [String],
    default: [],
  },
  equipmentIds: {
    type: [String],
    default: [],
  },
  supplierIds: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
  collection: 'process_sheets',
});

// Índices
ProcessSheetSchema.index({ code: 1 }, { unique: true });
ProcessSheetSchema.index({ name: 1 });
ProcessSheetSchema.index({ processTypeId: 1 });
ProcessSheetSchema.index({ processNameId: 1 });
ProcessSheetSchema.index({ status: 1 });
ProcessSheetSchema.index({ version: 1 });
ProcessSheetSchema.index({ responsible: 1 });
ProcessSheetSchema.index({ lastUpdate: 1 });

// Índices compuestos
ProcessSheetSchema.index({ processNameId: 1, version: 1 });
ProcessSheetSchema.index({ status: 1, updatedAt: 1 });
ProcessSheetSchema.index({ processTypeId: 1, status: 1 });

// Virtual para fullName
ProcessSheetSchema.virtual('fullName').get(function() {
  return `${this.processTypeId} > ${this.processNameId}`;
});
