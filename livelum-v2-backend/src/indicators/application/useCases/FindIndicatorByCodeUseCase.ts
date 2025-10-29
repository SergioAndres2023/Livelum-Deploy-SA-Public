import type { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';
import { IndicatorResponse } from '../dtos/IndicatorResponse';

export class FindIndicatorByCodeUseCase {
  constructor(
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  async execute(code: string): Promise<IndicatorResponse | null> {
    const indicator = await this.indicatorRepository.findByCode(code);
    
    if (!indicator) {
      return null;
    }

    return this.mapToResponse(indicator);
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
