import { JobProfile, JobProfileProps } from '../../../domain/entities/JobProfile';
import { JobProfileSchemaType } from '../schemas/JobProfileSchemaType';

export class JobProfileMapper {
  static toPersistence(jobProfile: JobProfile): JobProfileSchemaType {
    const primitives = jobProfile.toPrimitives();
    
    return {
      _id: primitives.id,
      organizationalChart: primitives.organizationalChart,
      name: primitives.name,
      description: primitives.description,
      supervisorUserId: primitives.supervisorUserId,
      supervisorUserName: primitives.supervisorUserName,
      parentJobProfileId: primitives.parentJobProfileId,
      parentJobProfileName: primitives.parentJobProfileName,
      organizationalLevel: primitives.organizationalLevel,
      status: primitives.status,
      responsibilities: primitives.responsibilities || [],
      requirements: primitives.requirements || [],
      competencies: primitives.competencies || [],
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: JobProfileSchemaType): JobProfile {
    const props: JobProfileProps = {
      id: schema._id,
      organizationalChart: schema.organizationalChart,
      name: schema.name,
      description: schema.description,
      supervisorUserId: schema.supervisorUserId,
      supervisorUserName: schema.supervisorUserName,
      parentJobProfileId: schema.parentJobProfileId,
      parentJobProfileName: schema.parentJobProfileName,
      organizationalLevel: schema.organizationalLevel,
      status: schema.status,
      responsibilities: schema.responsibilities,
      requirements: schema.requirements,
      competencies: schema.competencies,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return JobProfile.fromPrimitives(props);
  }
}

