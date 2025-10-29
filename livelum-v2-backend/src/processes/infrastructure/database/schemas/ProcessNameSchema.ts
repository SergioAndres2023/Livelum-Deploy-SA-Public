import { Schema } from 'mongoose';
import { ProcessNameDocument } from './ProcessNameSchemaType';

export const ProcessNameSchema = new Schema<ProcessNameDocument>({
  order: {
    type: Number,
    required: true,
    min: 1,
  },
  processTypeId: {
    type: String,
    required: true,
    ref: 'ProcessType',
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
  },
}, {
  timestamps: true,
  collection: 'process_names',
});

// Índices
ProcessNameSchema.index({ order: 1 });
ProcessNameSchema.index({ processTypeId: 1 });
ProcessNameSchema.index({ name: 1 });
ProcessNameSchema.index({ processTypeId: 1, order: 1 }, { unique: true });
