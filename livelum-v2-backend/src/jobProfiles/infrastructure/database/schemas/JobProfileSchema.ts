import { Schema, model } from 'mongoose';
import { JobProfileSchemaType } from './JobProfileSchemaType';
import { JobProfileStatus, OrganizationalLevel } from '../../../domain/enums/JobProfileEnums';

const JobProfileSchema = new Schema<JobProfileSchemaType>(
  {
    _id: { type: String, required: true },
    organizationalChart: { type: Number, required: true, min: 1, index: true },
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    supervisorUserId: { type: String, index: true },
    supervisorUserName: { type: String },
    parentJobProfileId: { type: String, index: true },
    parentJobProfileName: { type: String },
    organizationalLevel: {
      type: String,
      enum: Object.values(OrganizationalLevel),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(JobProfileStatus),
      default: JobProfileStatus.ACTIVE,
      required: true,
      index: true,
    },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    competencies: [{ type: String }],
    companyId: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'jobProfiles',
    timestamps: false,
    versionKey: false,
  }
);

JobProfileSchema.index({ companyId: 1, status: 1 });
JobProfileSchema.index({ companyId: 1, organizationalChart: 1 });
JobProfileSchema.index({ companyId: 1, organizationalLevel: 1 });
JobProfileSchema.index({ parentJobProfileId: 1 });

export const JobProfileModel = model<JobProfileSchemaType>('JobProfile', JobProfileSchema);

