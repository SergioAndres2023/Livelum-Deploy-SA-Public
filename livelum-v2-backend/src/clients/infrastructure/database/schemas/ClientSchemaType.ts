import { Document, Types } from 'mongoose';
import { ClientStatus, ClientType } from '../../../domain/enums/ClientEnums';

export interface ClientSchemaType extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: ClientType;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
}
