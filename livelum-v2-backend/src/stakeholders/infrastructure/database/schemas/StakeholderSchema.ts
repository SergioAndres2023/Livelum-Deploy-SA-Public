import { Schema, model } from 'mongoose';
import { StakeholderSchemaType } from './StakeholderSchemaType';
import { StakeholderType } from '../../../domain/enums/StakeholderEnums';

const StakeholderSchema = new Schema<StakeholderSchemaType>(
  {
    _id: { type: String, required: true },
    numero: { type: Number, required: true, index: true },
    nombre: { type: String, required: true, trim: true, index: true },
    tipo: {
      type: String,
      enum: Object.values(StakeholderType),
      required: true,
      index: true,
    },
    requisitos: { type: String, required: true },
    metodoEvaluacion: { type: String, required: true },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'stakeholders',
    timestamps: false,
    versionKey: false,
  }
);

StakeholderSchema.index({ companyId: 1, numero: 1 }, { unique: true });
StakeholderSchema.index({ companyId: 1, tipo: 1 });

export const StakeholderModel = model<StakeholderSchemaType>('Stakeholder', StakeholderSchema);

