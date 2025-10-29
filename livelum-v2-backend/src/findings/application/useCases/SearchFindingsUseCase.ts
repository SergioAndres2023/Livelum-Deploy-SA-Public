import { Finding } from '../../domain/entities/Finding';
import type { FindingRepository } from '../../domain/contracts/FindingRepository';
import { SearchFindingsRequest } from '../dtos/SearchFindingsRequest';
import { FindingResponse } from '../dtos/FindingResponse';
import { FindingSearchCriteriaBuilder } from '../../domain/filters/FindingSearchCriteriaBuilder';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class SearchFindingsUseCase {
  constructor(
    private readonly findingRepository: FindingRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: SearchFindingsRequest): Promise<FindingResponse[]> {
    this.logger.info('Buscando hallazgos', { request });

    const builder = FindingSearchCriteriaBuilder.create();
    if (request.summary) builder.withSummary(request.summary);
    if (request.origin) builder.withOrigin(request.origin);
    if (request.type) builder.withType(request.type);
    if (request.status) builder.withStatus(request.status);
    if (request.processId) builder.withProcessId(request.processId);
    if (request.companyId) builder.withCompanyId(request.companyId);
    if (request.detectionDateFrom && request.detectionDateTo) {
      builder.withDetectionDateRange(request.detectionDateFrom, request.detectionDateTo);
    }
    if (request.overdueActions) builder.overdueActionsOnly();
    if (request.overdueControls) builder.overdueControlsOnly();
    if (request.page && request.limit) builder.withPagination(request.page, request.limit);
    if (request.sortBy && request.sortOrder) builder.withSorting(request.sortBy, request.sortOrder);

    const criteria = builder.build();
    const findings = await this.findingRepository.findByCriteria(criteria);

    this.logger.info('Hallazgos encontrados', { count: findings.length });
    return findings.map(f => this.mapToResponse(f));
  }

  private mapToResponse(finding: Finding): FindingResponse {
    const primitives = finding.toPrimitives();
    return {
      ...primitives,
      isOpen: finding.isOpen(),
      isInProgress: finding.isInProgress(),
      isClosed: finding.isClosed(),
      hasOverdueActions: finding.hasOverdueActions(),
      hasOverdueControls: finding.hasOverdueControls(),
      completionPercentage: finding.getCompletionPercentage(),
    };
  }
}
