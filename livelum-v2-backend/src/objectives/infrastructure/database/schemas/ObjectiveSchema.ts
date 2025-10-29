import { Schema, model } from 'mongoose';
import { ObjectiveSchemaType } from './ObjectiveSchemaType';
import { ObjectiveStatus, ActionStatus } from '../../../domain/enums/ObjectiveEnums';

const CommentSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  actionRequired: { type: Boolean, required: true, default: false },
  actionDescription: { type: String },
  actionDueDate: { type: Date },
  actionStatus: { type: String, enum: Object.values(ActionStatus) },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
}, { _id: false });

const ObjectiveSchema = new Schema<ObjectiveSchemaType>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    targetValue: { type: Number, required: true },
    currentValue: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true },
    startDate: { type: Date, required: true, index: true },
    targetDate: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: Object.values(ObjectiveStatus),
      default: ObjectiveStatus.ACTIVE,
      required: true,
      index: true,
    },
    indicatorId: { type: String, index: true },
    indicatorName: { type: String },
    responsibleUserId: { type: String, required: true, index: true },
    responsibleUserName: { type: String, required: true },
    companyId: { type: String, required: true, index: true },
    comments: { type: [CommentSchema], default: [] },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'objectives',
    timestamps: false,
    versionKey: false,
  }
);

ObjectiveSchema.index({ companyId: 1, status: 1 });
ObjectiveSchema.index({ responsibleUserId: 1, status: 1 });
ObjectiveSchema.index({ targetDate: 1, status: 1 });

export const ObjectiveModel = model<ObjectiveSchemaType>('Objective', ObjectiveSchema);

