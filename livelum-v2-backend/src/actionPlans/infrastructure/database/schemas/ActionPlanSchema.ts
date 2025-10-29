import { Schema, model } from 'mongoose';
import { ActionPlanSchemaType } from './ActionPlanSchemaType';
import { ActionPlanOriginType, ActionPlanStatus, PlanActionStatus, PlanControlStatus } from '../../../domain/enums/ActionPlanEnums';

const PlanActionSchema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  responsible: { type: String, required: true },
  plannedDate: { type: Date, required: true },
  completionDate: { type: Date },
  status: { type: String, enum: Object.values(PlanActionStatus), required: true },
  evidence: { type: String },
  comments: { type: String },
}, { _id: false });

const PlanControlSchema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  estimatedDate: { type: Date, required: true },
  actualDate: { type: Date },
  status: { type: String, enum: Object.values(PlanControlStatus), required: true },
  responsible: { type: String, required: true },
  result: { type: String },
  comments: { type: String },
}, { _id: false });

const ActionPlanSchema = new Schema<ActionPlanSchemaType>(
  {
    _id: { type: String, required: true },
    createdDate: { type: Date, required: true, index: true },
    originType: {
      type: String,
      enum: Object.values(ActionPlanOriginType),
      required: true,
      index: true,
    },
    originDescription: { type: String, required: true },
    originId: { type: String, index: true },
    status: {
      type: String,
      enum: Object.values(ActionPlanStatus),
      default: ActionPlanStatus.PENDING,
      required: true,
      index: true,
    },
    actions: [PlanActionSchema],
    controls: [PlanControlSchema],
    completionPercentage: { type: Number, required: true, default: 0, min: 0, max: 100, index: true },
    companyId: { type: String, required: true, index: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'actionPlans',
    timestamps: false,
    versionKey: false,
  }
);

ActionPlanSchema.index({ companyId: 1, status: 1 });
ActionPlanSchema.index({ companyId: 1, originType: 1 });
ActionPlanSchema.index({ originId: 1, originType: 1 });
ActionPlanSchema.index({ companyId: 1, completionPercentage: -1 });

export const ActionPlanModel = model<ActionPlanSchemaType>('ActionPlan', ActionPlanSchema);

