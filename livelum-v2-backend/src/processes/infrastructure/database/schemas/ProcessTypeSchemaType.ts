import { Document } from 'mongoose';

export interface ProcessTypeLink {
  name: string;
  path: string;
}

export interface ProcessTypeDocument extends Document {
  _id: string;
  order: number;
  name: string;
  links: ProcessTypeLink[];
  createdAt: Date;
  updatedAt: Date;
}
