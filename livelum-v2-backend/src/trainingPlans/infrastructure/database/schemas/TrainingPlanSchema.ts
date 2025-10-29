import { Schema, model } from 'mongoose';
import { TrainingPlanSchemaType } from './TrainingPlanSchemaType';
import { TrainingPlanType, TrainingPlanStatus } from '../../../domain/enums/TrainingPlanEnums';

const TrainingPlanSchema = new Schema<TrainingPlanSchemaType>(
  {
    _id: { type: String, required: true },
    plannedDate: { type: Date, required: true, index: true },
    topic: { type: String, required: true, trim: true, index: true },
    type: {
      type: String,
      enum: Object.values(TrainingPlanType),
      required: true,
      index: true,
    },
    completionDate: { type: Date, index: true },
    status: {
      type: String,
      enum: Object.values(TrainingPlanStatus),
      default: TrainingPlanStatus.PENDING,
      required: true,
      index: true,
    },
    instructor: { type: String },
    provider: { type: String },
    duration: { type: Number, min: 0 },
    participants: [{ type: String }],
    participantIds: [{ type: String }],
    objectives: { type: String },
    evaluation: { type: String },
    comments: { type: String },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'trainingPlans',
    timestamps: false,
    versionKey: false,
  }
);

TrainingPlanSchema.index({ companyId: 1, status: 1 });
TrainingPlanSchema.index({ companyId: 1, type: 1 });
TrainingPlanSchema.index({ companyId: 1, plannedDate: -1 });

export const TrainingPlanModel = model<TrainingPlanSchemaType>('TrainingPlan', TrainingPlanSchema);

