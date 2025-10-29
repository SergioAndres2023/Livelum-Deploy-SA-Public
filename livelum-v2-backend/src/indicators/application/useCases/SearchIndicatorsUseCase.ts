import type { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';
import { SearchIndicatorsRequest } from '../dtos/SearchIndicatorsRequest';
import { IndicatorResponse } from '../dtos/IndicatorResponse';

export class SearchIndicatorsUseCase {
  constructor(
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  async execute(request: SearchIndicatorsRequest): Promise<IndicatorResponse[]> {
    const criteria = this.mapToCriteria(request);
    const indicators = await this.indicatorRepository.findByCriteria(criteria);
    
    return indicators.map(indicator => this.mapToResponse(indicator));
  }

  private mapToCriteria(request: SearchIndicatorsRequest): any {
    const criteria: any = {};

    if (request.name) criteria.name = request.name;
    if (request.code) criteria.code = request.code;
    if (request.category) criteria.category = request.category;
    if (request.type) criteria.type = request.type;
    if (request.trend) criteria.trend = request.trend;
    if (request.status) criteria.status = request.status;
    if (request.owner) criteria.owner = request.owner;
    if (request.frequency) criteria.frequency = request.frequency;
    if (request.isCritical !== undefined) criteria.isCritical = request.isCritical;
    if (request.isWarning !== undefined) criteria.isWarning = request.isWarning;
    if (request.isGood !== undefined) criteria.isGood = request.isGood;
    if (request.isAboveTarget !== undefined) criteria.isAboveTarget = request.isAboveTarget;
    if (request.isBelowTarget !== undefined) criteria.isBelowTarget = request.isBelowTarget;
    if (request.lastUpdateFrom) criteria.lastUpdateFrom = request.lastUpdateFrom;
    if (request.lastUpdateTo) criteria.lastUpdateTo = request.lastUpdateTo;
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

  private mapToResponse(indicator: any): IndicatorResponse {
    const primitives = indicator.toPrimitives();
    return {
      id: primitives.id,
      name: primitives.name,
      code: primitives.code,
      category: primitives.category,
      type: primitives.type,
      currentValue: primitives.currentValue,
      targetValue: primitives.targetValue,
      unit: primitives.unit,
      trend: primitives.trend,
      status: primitives.status,
      owner: primitives.owner,
      lastUpdate: primitives.lastUpdate,
      frequency: primitives.frequency,
      description: primitives.description,
      isAboveTarget: indicator.isAboveTarget(),
      isBelowTarget: indicator.isBelowTarget(),
      isOnTarget: indicator.isOnTarget(),
      progressPercentage: indicator.getProgressPercentage(),
      isCritical: indicator.isCritical(),
      isWarning: indicator.isWarning(),
      isGood: indicator.isGood(),
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
