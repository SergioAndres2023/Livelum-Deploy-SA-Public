import type { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';
import { UpdateIndicatorValueRequest } from '../dtos/UpdateIndicatorValueRequest';
import { IndicatorResponse } from '../dtos/IndicatorResponse';

export class UpdateIndicatorValueUseCase {
  constructor(
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  async execute(id: string, request: UpdateIndicatorValueRequest): Promise<IndicatorResponse> {
    const indicator = await this.indicatorRepository.findById(id);
    
    if (!indicator) {
      throw new Error(`Indicador con ID ${id} no encontrado`);
    }

    try {
      indicator.updateValue(request.currentValue);
      await this.indicatorRepository.update(indicator);
      return this.mapToResponse(indicator);
    } catch (error) {
      throw new Error(`Error al actualizar valor del indicador: ${(error as Error).message}`);
    }
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
