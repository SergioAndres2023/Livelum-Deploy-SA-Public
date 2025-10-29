import mongoose, { Schema } from 'mongoose';
import { DocumentType, DocumentStatus } from '../../../domain/enums/DocumentEnums';
import { DocumentSchemaType } from './DocumentSchemaType';

const documentSchema = new Schema<DocumentSchemaType>({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    minlength: 3,
    maxlength: 20,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  version: {
    type: String,
    required: true,
    default: '1.0',
    match: [/^\d+\.\d+$/, 'Versión debe tener formato X.Y'],
  },
  type: {
    type: String,
    enum: Object.values(DocumentType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(DocumentStatus),
    required: true,
    default: DocumentStatus.BORRADOR,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    validate: {
      validator: function(this: DocumentSchemaType, value: Date) {
        return !value || value > this.createdDate;
      },
      message: 'La fecha de vencimiento debe ser posterior a la fecha de creación',
    },
  },
  fileUrl: {
    type: String,
    trim: true,
  },
  fileName: {
    type: String,
    trim: true,
    maxlength: 255,
  },
  fileSize: {
    type: Number,
    min: 0,
  },
  mimeType: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'documents',
});

// Índices para optimizar búsquedas
documentSchema.index({ code: 1 });
documentSchema.index({ title: 1 });
documentSchema.index({ type: 1 });
documentSchema.index({ status: 1 });
documentSchema.index({ author: 1 });
documentSchema.index({ createdDate: -1 });
documentSchema.index({ expiryDate: 1 });
documentSchema.index({ createdAt: -1 });

// Índices compuestos para búsquedas frecuentes
documentSchema.index({ type: 1, status: 1 });
documentSchema.index({ status: 1, expiryDate: 1 });
documentSchema.index({ author: 1, status: 1 });

// Índice de texto para búsquedas full-text
documentSchema.index({ 
  title: 'text', 
  description: 'text',
  code: 'text' 
});

export const DocumentModel = mongoose.model<DocumentSchemaType>('Document', documentSchema);
