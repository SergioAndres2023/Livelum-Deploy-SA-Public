import { Schema, model } from 'mongoose';
import { FindingSchemaType } from './FindingSchemaType';
import { FindingOrigin, FindingType, FindingStatus, ActionStatus, ControlStatus } from '../../../domain/enums/FindingEnums';

const ActionSchema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  responsible: { type: String, required: true },
  plannedDate: { type: Date, required: true },
  completionDate: { type: Date },
  status: { type: String, enum: Object.values(ActionStatus), required: true },
  evidence: { type: String },
  comments: { type: String },
}, { _id: false });

const ControlSchema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  estimatedDate: { type: Date, required: true },
  actualDate: { type: Date },
  status: { type: String, enum: Object.values(ControlStatus), required: true },
  responsible: { type: String, required: true },
  result: { type: String },
  comments: { type: String },
}, { _id: false });

const FindingSchema = new Schema<FindingSchemaType>(
  {
    _id: { type: String, required: true },
    detectionDate: { type: Date, required: true, index: true },
    emissionDate: { type: Date, required: true, index: true },
    summary: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    processId: { type: String, required: true, index: true },
    processName: { type: String, required: true },
    origin: {
      type: String,
      enum: Object.values(FindingOrigin),
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(FindingType),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(FindingStatus),
      default: FindingStatus.OPEN,
      required: true,
      index: true,
    },
    containmentActions: { type: String },
    causeAnalysis: { type: String },
    causeAnalysisDate: { type: Date },
    relatedFindings: [{ type: String }],
    relatedAudits: [{ type: String }],
    performedBy: { type: String, required: true },
    involvedActors: [{ type: String }],
    actions: [ActionSchema],
    controls: [ControlSchema],
    companyId: { type: String, required: true, index: true },
    version: { type: Number, required: true, default: 1 },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'findings',
    timestamps: false,
    versionKey: false,
  }
);

FindingSchema.index({ companyId: 1, status: 1 });
FindingSchema.index({ companyId: 1, type: 1 });
FindingSchema.index({ companyId: 1, detectionDate: -1 });
FindingSchema.index({ processId: 1, status: 1 });

export const FindingModel = model<FindingSchemaType>('Finding', FindingSchema);

