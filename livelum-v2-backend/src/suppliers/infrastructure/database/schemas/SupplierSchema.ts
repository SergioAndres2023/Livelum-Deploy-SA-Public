import { Schema, model } from 'mongoose';
import { SupplierSchemaType } from './SupplierSchemaType';
import { SupplierStatus } from '../../../domain/enums/SupplierEnums';

const ContactSchema = new Schema({
  cuit: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
}, { _id: false });

const SupplierSchema = new Schema<SupplierSchemaType>(
  {
    _id: { type: String, required: true },
    rubro: { type: String, required: true, trim: true, index: true },
    proveedor: { type: String, required: true, trim: true, index: true },
    contacto: { type: ContactSchema, required: true },
    ultimaEvaluacion: { type: Date, index: true },
    siguienteEvaluacion: { type: Date, index: true },
    estado: {
      type: String,
      enum: Object.values(SupplierStatus),
      default: SupplierStatus.NOT_APPROVED,
      required: true,
      index: true,
    },
    evaluacion: { type: Number, required: true, min: 0, max: 10, default: 0, index: true },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'suppliers',
    timestamps: false,
    versionKey: false,
  }
);

SupplierSchema.index({ companyId: 1, estado: 1 });
SupplierSchema.index({ companyId: 1, evaluacion: -1 });
SupplierSchema.index({ companyId: 1, siguienteEvaluacion: 1 });

export const SupplierModel = model<SupplierSchemaType>('Supplier', SupplierSchema);

