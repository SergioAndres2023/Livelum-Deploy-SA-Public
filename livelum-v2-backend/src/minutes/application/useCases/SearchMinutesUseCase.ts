import { Minute } from '../../domain/entities/Minute';
import type { MinuteRepository } from '../../domain/contracts/MinuteRepository';
import { SearchMinutesRequest } from '../dtos/SearchMinutesRequest';
import { MinuteResponse } from '../dtos/MinuteResponse';
import { MinuteSearchCriteriaBuilder } from '../../domain/filters/MinuteSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchMinutesUseCase {
  constructor(
    private readonly minuteRepository: MinuteRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchMinutesRequest): Promise<MinuteResponse[]> {
    this.logger.info('Buscando minutas', { request });

    const builder = MinuteSearchCriteriaBuilder.create();
    if (request.title) builder.withTitle(request.title);
    if (request.type) builder.withType(request.type);
    if (request.status) builder.withStatus(request.status);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.meetingDateFrom && request.meetingDateTo) {
      builder.withMeetingDateRange(request.meetingDateFrom, request.meetingDateTo);
    }
    if (request.createdBy) builder.withCreatedBy(request.createdBy);
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const minutes = await this.minuteRepository.findByCriteria(criteria);

    this.logger.info('Minutas encontradas', { count: minutes.length });
    return minutes.map(m => this.mapToResponse(m));
  }

  private mapToResponse(minute: Minute): MinuteResponse {
    const primitives = minute.toPrimitives();
    return {
      ...primitives,
      isDraft: minute.isDraft(),
      isPublished: minute.isPublished(),
      isApproved: minute.isApproved(),
      isArchived: minute.isArchived(),
    };
  }
}
