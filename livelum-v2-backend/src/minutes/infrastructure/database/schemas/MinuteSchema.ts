import { Schema, model } from 'mongoose';
import { MinuteSchemaType } from './MinuteSchemaType';
import { MinuteType, MinuteStatus } from '../../../domain/enums/MinuteEnums';

const MinuteSchema = new Schema<MinuteSchemaType>(
  {
    _id: { type: String, required: true },
    meetingDate: { type: Date, required: true, index: true },
    title: { type: String, required: true, trim: true, index: true },
    type: {
      type: String,
      enum: Object.values(MinuteType),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(MinuteStatus),
      default: MinuteStatus.DRAFT,
      required: true,
      index: true,
    },
    participants: [{ type: String, required: true }],
    participantIds: [{ type: String }],
    content: { type: String, required: true },
    topics: [{ type: String }],
    agreements: [{ type: String }],
    actionItems: [{ type: String }],
    location: { type: String },
    duration: { type: Number, min: 0 },
    nextMeetingDate: { type: Date },
    attachments: [{ type: String }],
    createdBy: { type: String, required: true, index: true },
    approvedBy: { type: String, index: true },
    approvedAt: { type: Date },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'minutes',
    timestamps: false,
    versionKey: false,
  }
);

MinuteSchema.index({ companyId: 1, status: 1 });
MinuteSchema.index({ companyId: 1, type: 1 });
MinuteSchema.index({ companyId: 1, meetingDate: -1 });

export const MinuteModel = model<MinuteSchemaType>('Minute', MinuteSchema);

