import { Document } from 'mongoose';

export interface ProcessNameDocument extends Document {
  _id: string;
  order: number;
  processTypeId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
