import { Schema, model } from 'mongoose';
import { EquipmentSchemaType } from './EquipmentSchemaType';
import { EquipmentStatus, EquipmentType } from '../../../domain/enums/EquipmentEnums';

const EquipmentSchema = new Schema<EquipmentSchemaType>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true, index: true },
    type: {
      type: String,
      enum: Object.values(EquipmentType),
      required: true,
      index: true,
    },
    brand: { type: String, trim: true, index: true },
    model: { type: String, trim: true },
    serialNumber: { type: String, trim: true, index: true, sparse: true },
    code: { type: String, trim: true, index: true, sparse: true },
    physicalLocation: { type: String, trim: true, index: true },
    status: {
      type: String,
      enum: Object.values(EquipmentStatus),
      default: EquipmentStatus.ACTIVE,
      required: true,
      index: true,
    },
    acquisitionDate: { type: Date },
    lastMaintenanceDate: { type: Date },
    nextMaintenanceDate: { type: Date, index: true },
    responsible: { type: String, index: true },
    notes: { type: String },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'equipment',
    timestamps: false,
    versionKey: false,
  }
);

EquipmentSchema.index({ companyId: 1, status: 1 });
EquipmentSchema.index({ companyId: 1, type: 1 });
EquipmentSchema.index({ companyId: 1, serialNumber: 1 }, { unique: true, sparse: true });
EquipmentSchema.index({ companyId: 1, code: 1 }, { unique: true, sparse: true });

export const EquipmentModel = model<EquipmentSchemaType>('Equipment', EquipmentSchema);
