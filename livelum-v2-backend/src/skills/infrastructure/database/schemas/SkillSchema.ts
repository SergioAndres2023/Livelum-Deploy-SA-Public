import { Schema, model } from 'mongoose';
import { SkillSchemaType } from './SkillSchemaType';
import { SkillCategory, SkillStatus } from '../../../domain/enums/SkillEnums';

const SkillSchema = new Schema<SkillSchemaType>(
  {
    _id: { type: String, required: true },
    number: { type: Number, required: true, min: 1, index: true },
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String },
    category: {
      type: String,
      enum: Object.values(SkillCategory),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(SkillStatus),
      default: SkillStatus.ACTIVE,
      required: true,
      index: true,
    },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'skills',
    timestamps: false,
    versionKey: false,
  }
);

SkillSchema.index({ companyId: 1, number: 1 }, { unique: true });
SkillSchema.index({ companyId: 1, status: 1 });
SkillSchema.index({ companyId: 1, category: 1 });

export const SkillModel = model<SkillSchemaType>('Skill', SkillSchema);
