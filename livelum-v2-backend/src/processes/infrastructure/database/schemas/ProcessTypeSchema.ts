import { Schema } from 'mongoose';
import { ProcessTypeDocument } from './ProcessTypeSchemaType';

const ProcessTypeLinkSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  path: {
    type: String,
    required: true,
    trim: true,
  },
}, { _id: false });

export const ProcessTypeSchema = new Schema<ProcessTypeDocument>({
  order: {
    type: Number,
    required: true,
    min: 1,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
    minlength: 3,
  },
  links: {
    type: [ProcessTypeLinkSchema],
    default: [],
  },
}, {
  timestamps: true,
  collection: 'process_types',
});

// Índices
ProcessTypeSchema.index({ order: 1 });
ProcessTypeSchema.index({ name: 1 });
