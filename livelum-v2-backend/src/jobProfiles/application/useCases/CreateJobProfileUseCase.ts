import { JobProfile } from '../../domain/entities/JobProfile';
import type { JobProfileRepository } from '../../domain/contracts/JobProfileRepository';
import { CreateJobProfileRequest } from '../dtos/CreateJobProfileRequest';
import { JobProfileResponse } from '../dtos/JobProfileResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateJobProfileUseCase {
  constructor(
    private readonly jobProfileRepository: JobProfileRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateJobProfileRequest): Promise<JobProfileResponse> {
    this.logger.info('Creando nuevo perfil de puesto', { name: request.name });

    try {
      const jobProfile = JobProfile.create(request);
      await this.jobProfileRepository.save(jobProfile);

      this.logger.info('Perfil de puesto creado exitosamente', { jobProfileId: jobProfile.id });
      return this.mapToResponse(jobProfile);
    } catch (error) {
      this.logger.error('Error al crear perfil de puesto', { error: (error as Error).message, request });
      throw error;
    }
  }

  private mapToResponse(jobProfile: JobProfile): JobProfileResponse {
    const primitives = jobProfile.toPrimitives();
    return {
      ...primitives,
      isActive: jobProfile.isActive(),
      isInactive: jobProfile.isInactive(),
      isDraft: jobProfile.isDraft(),
      hasParent: jobProfile.hasParent(),
      hasSupervisor: jobProfile.hasSupervisor(),
    };
  }
}
