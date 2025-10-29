import mongoose, { Schema } from 'mongoose';
import { CompanyStatus } from '../../../domain/enums/CompanyEnums';

/**
 * Schema de MongoDB para Company
 */
export const CompanySchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    razonSocial: {
      type: String,
      required: true,
      index: true,
    },
    nombreFantasia: {
      type: String,
      required: true,
      index: true,
    },
    cuit: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    direccion: {
      type: String,
      default: undefined,
    },
    ciudad: {
      type: String,
      index: true,
      default: undefined,
    },
    provincia: {
      type: String,
      index: true,
      default: undefined,
    },
    codigoPostal: {
      type: String,
      default: undefined,
    },
    telefono: {
      type: String,
      default: undefined,
    },
    email: {
      type: String,
      default: undefined,
    },
    website: {
      type: String,
      default: undefined,
    },
    logo: {
      type: String,
      default: undefined,
    },
    status: {
      type: String,
      enum: Object.values(CompanyStatus),
      required: true,
      index: true,
      default: CompanyStatus.ACTIVE,
    },
    createdAt: {
      type: Date,
      required: true,
      index: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'companies',
    versionKey: false,
    timestamps: false,
  }
);

// Índices compuestos para optimizar búsquedas
CompanySchema.index({ razonSocial: 1, status: 1 });
CompanySchema.index({ nombreFantasia: 1, status: 1 });
CompanySchema.index({ ciudad: 1, provincia: 1 });
CompanySchema.index({ status: 1, createdAt: -1 });

export const CompanyModel = mongoose.model('Company', CompanySchema);

