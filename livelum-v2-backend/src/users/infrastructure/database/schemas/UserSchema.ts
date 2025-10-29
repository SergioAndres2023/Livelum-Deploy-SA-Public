import { Schema, model } from 'mongoose';
import { UserSchemaType } from './UserSchemaType';
import { UserRole, UserStatus } from '../../../domain/enums/UserEnums';

/**
 * Schema de Mongoose para User
 */
const UserSchema = new Schema<UserSchemaType>(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    companyId: {
      type: String,
      required: true,
      index: true,
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.VIEWER],
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
      required: true,
      index: true,
    },
    avatar: {
      type: String,
    },
    lastLogin: {
      type: Date,
      index: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },
    resetPasswordToken: {
      type: String,
      index: true,
    },
    resetPasswordExpires: {
      type: Date,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    collection: 'users',
    timestamps: false, // Manejamos manualmente createdAt y updatedAt
    versionKey: false,
  }
);

// Índices compuestos para optimizar búsquedas comunes
UserSchema.index({ companyId: 1, status: 1 });
UserSchema.index({ companyId: 1, roles: 1 });
UserSchema.index({ status: 1, createdAt: -1 });
UserSchema.index({ emailVerified: 1, status: 1 });

export const UserModel = model<UserSchemaType>('User', UserSchema);

