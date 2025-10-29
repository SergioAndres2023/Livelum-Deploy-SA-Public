import { Schema, model } from 'mongoose';
import { PersonSchemaType } from './PersonSchemaType';
import { PersonStatus, ContractType } from '../../../domain/enums/PersonEnums';

const PersonSchema = new Schema<PersonSchemaType>(
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
      lowercase: true,
      trim: true,
      index: true,
    },
    documento: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
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
    status: {
      type: String,
      enum: Object.values(PersonStatus),
      default: PersonStatus.ACTIVE,
      required: true,
      index: true,
    },
    positions: {
      type: [String],
      default: [],
    },
    contractType: {
      type: String,
      enum: Object.values(ContractType),
      index: true,
    },
    hireDate: {
      type: Date,
      index: true,
    },
    terminationDate: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    department: {
      type: String,
      index: true,
    },
    supervisor: {
      type: String,
    },
    salary: {
      type: Number,
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    address: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    notes: {
      type: String,
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
    collection: 'people',
    timestamps: false,
    versionKey: false,
  }
);

PersonSchema.index({ companyId: 1, status: 1 });
PersonSchema.index({ companyId: 1, department: 1 });
PersonSchema.index({ status: 1, hireDate: -1 });
PersonSchema.index({ positions: 1 });

export const PersonModel = model<PersonSchemaType>('Person', PersonSchema);

