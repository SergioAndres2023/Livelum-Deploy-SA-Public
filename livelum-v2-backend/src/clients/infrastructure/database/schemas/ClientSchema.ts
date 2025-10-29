import mongoose, { Schema } from 'mongoose';
import { ClientStatus, ClientType } from '../../../domain/enums/ClientEnums';
import { ClientSchemaType } from './ClientSchemaType';

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido'],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[+]?[\d\s\-\(\)]{9,}$/, 'Teléfono inválido'],
  },
  nif: {
    type: String,
    trim: true,
    uppercase: true,
    match: [/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/, 'NIF inválido'],
  },
  address: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  type: {
    type: String,
    enum: Object.values(ClientType),
    required: true,
    default: ClientType.INDIVIDUAL,
  },
  status: {
    type: String,
    enum: Object.values(ClientStatus),
    required: true,
    default: ClientStatus.ACTIVE,
  },
}, {
  timestamps: true,
  collection: 'clients',
});

// Índices para optimizar búsquedas
clientSchema.index({ email: 1 });
clientSchema.index({ name: 1 });
clientSchema.index({ status: 1 });
clientSchema.index({ type: 1 });
clientSchema.index({ createdAt: -1 });
clientSchema.index({ nif: 1 }, { sparse: true });
clientSchema.index({ phone: 1 }, { sparse: true });

// Índice compuesto para búsquedas frecuentes
clientSchema.index({ status: 1, type: 1, createdAt: -1 });

export const ClientModel = mongoose.model<ClientSchemaType>('Client', clientSchema);
