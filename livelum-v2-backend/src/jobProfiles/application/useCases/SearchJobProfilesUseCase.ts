import { JobProfile } from '../../domain/entities/JobProfile';
import type { JobProfileRepository } from '../../domain/contracts/JobProfileRepository';
import { SearchJobProfilesRequest } from '../dtos/SearchJobProfilesRequest';
import { JobProfileResponse } from '../dtos/JobProfileResponse';
import { JobProfileSearchCriteriaBuilder } from '../../domain/filters/JobProfileSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchJobProfilesUseCase {
  constructor(
    private readonly jobProfileRepository: JobProfileRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchJobProfilesRequest): Promise<JobProfileResponse[]> {
    this.logger.info('Buscando perfiles de puesto', { request });

    const builder = JobProfileSearchCriteriaBuilder.create();
    if (request.name) builder.withName(request.name);
    if (request.status) builder.withStatus(request.status);
    if (request.organizationalLevel) builder.withOrganizationalLevel(request.organizationalLevel);
    if (request.parentJobProfileId) builder.withParentJobProfileId(request.parentJobProfileId);
    if (request.supervisorUserId) builder.withSupervisorUserId(request.supervisorUserId);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const jobProfiles = await this.jobProfileRepository.findByCriteria(criteria);

    this.logger.info('Perfiles de puesto encontrados', { count: jobProfiles.length });
    return jobProfiles.map(jp => this.mapToResponse(jp));
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
