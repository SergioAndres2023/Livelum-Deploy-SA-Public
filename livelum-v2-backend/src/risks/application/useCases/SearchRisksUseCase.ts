import type { RiskRepository } from '../../domain/contracts/RiskRepository';
import { SearchRisksRequest } from '../dtos/SearchRisksRequest';
import { RiskResponse } from '../dtos/RiskResponse';

export class SearchRisksUseCase {
  constructor(
    private readonly riskRepository: RiskRepository,
  ) {}

  async execute(request: SearchRisksRequest): Promise<RiskResponse[]> {
    const criteria = this.mapToCriteria(request);
    const risks = await this.riskRepository.findByCriteria(criteria);
    
    return risks.map(risk => this.mapToResponse(risk));
  }

  private mapToCriteria(request: SearchRisksRequest): any {
    const criteria: any = {};

    if (request.title) criteria.title = request.title;
    if (request.code) criteria.code = request.code;
    if (request.category) criteria.category = request.category;
    if (request.probability) criteria.probability = request.probability;
    if (request.impact) criteria.impact = request.impact;
    if (request.riskLevel) criteria.riskLevel = request.riskLevel;
    if (request.status) criteria.status = request.status;
    if (request.owner) criteria.owner = request.owner;
    if (request.isOverdue !== undefined) criteria.isOverdue = request.isOverdue;
    if (request.isCritical !== undefined) criteria.isCritical = request.isCritical;
    if (request.dueDateFrom) criteria.dueDateFrom = request.dueDateFrom;
    if (request.dueDateTo) criteria.dueDateTo = request.dueDateTo;
    if (request.createdAtFrom) criteria.createdAtFrom = request.createdAtFrom;
    if (request.createdAtTo) criteria.createdAtTo = request.createdAtTo;
    if (request.sortBy) criteria.sortBy = request.sortBy;
    if (request.sortOrder) criteria.sortOrder = request.sortOrder;

    // Paginación
    if (request.page && request.limit) {
      criteria.limit = request.limit;
      criteria.offset = (request.page - 1) * request.limit;
    }

    return criteria;
  }

  private mapToResponse(risk: any): RiskResponse {
    const primitives = risk.toPrimitives();
    return {
      id: primitives.id,
      title: primitives.title,
      code: primitives.code,
      category: primitives.category,
      probability: primitives.probability,
      impact: primitives.impact,
      riskLevel: primitives.riskLevel,
      status: primitives.status,
      owner: primitives.owner,
      dueDate: primitives.dueDate,
      description: primitives.description,
      mitigation: primitives.mitigation,
      isOverdue: risk.isOverdue(),
      isCritical: risk.isCritical(),
      isHighRisk: risk.isHighRisk(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
