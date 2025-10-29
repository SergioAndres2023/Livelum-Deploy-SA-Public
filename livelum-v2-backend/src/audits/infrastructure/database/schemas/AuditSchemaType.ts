import { Document, Types } from 'mongoose';
import { AuditType, AuditStatus } from '../../../domain/enums/AuditEnums';

export interface AuditSchemaType extends Document {
  _id: Types.ObjectId;
  title: string;
  auditType: AuditType;
  status: AuditStatus;
  plannedDate: Date;
  actualDate?: Date;
  auditorName: string;
  scope: string;
  findings?: string;
  recommendations?: string;
  createdAt: Date;
  updatedAt: Date;
}
