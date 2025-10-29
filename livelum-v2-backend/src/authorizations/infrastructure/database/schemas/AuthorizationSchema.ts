import { Schema, model } from 'mongoose';
import { AuthorizationSchemaType } from './AuthorizationSchemaType';
import { AuthorizationStatus, AuthorizationType } from '../../../domain/enums/AuthorizationEnums';

const AuthorizationSchema = new Schema<AuthorizationSchemaType>(
  {
    _id: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(AuthorizationType),
      required: true,
      index: true,
    },
    entityId: { type: String, required: true, index: true },
    entityName: { type: String, required: true },
    version: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(AuthorizationStatus),
      default: AuthorizationStatus.PENDING,
      required: true,
      index: true,
    },
    requestedBy: { type: String, required: true, index: true },
    requestedAt: { type: Date, required: true, index: true },
    approvedBy: { type: String, index: true },
    approvedAt: { type: Date },
    rejectedBy: { type: String },
    rejectedAt: { type: Date },
    comments: { type: String },
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'authorizations',
    timestamps: false,
    versionKey: false,
  }
);

AuthorizationSchema.index({ companyId: 1, status: 1 });
AuthorizationSchema.index({ companyId: 1, type: 1 });
AuthorizationSchema.index({ entityId: 1, version: 1 });

export const AuthorizationModel = model<AuthorizationSchemaType>('Authorization', AuthorizationSchema);
