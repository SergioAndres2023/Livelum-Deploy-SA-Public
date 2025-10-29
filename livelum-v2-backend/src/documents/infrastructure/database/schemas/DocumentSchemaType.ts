import { Document, Types } from 'mongoose';
import { DocumentType, DocumentStatus } from '../../../domain/enums/DocumentEnums';

export interface DocumentSchemaType extends Document {
  _id: Types.ObjectId;
  code: string;
  title: string;
  description?: string;
  version: string;
  type: DocumentType;
  status: DocumentStatus;
  author: string;
  createdDate: Date;
  expiryDate?: Date;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt: Date;
  updatedAt: Date;
}
