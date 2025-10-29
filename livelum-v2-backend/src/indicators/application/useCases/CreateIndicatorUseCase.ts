import { Indicator } from '../../domain/entities/Indicator';
import type { IndicatorRepository } from '../../domain/contracts/IndicatorRepository';
import { CreateIndicatorRequest } from '../dtos/CreateIndicatorRequest';
import { IndicatorResponse } from '../dtos/IndicatorResponse';

export class CreateIndicatorUseCase {
  constructor(
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  async execute(request: CreateIndicatorRequest): Promise<IndicatorResponse> {
    // Verificar que el código no esté en uso
    const existingByCode = await this.indicatorRepository.findByCode(request.code);
    if (existingByCode) {
      throw new Error(`Ya existe un indicador con el código: ${request.code}`);
    }

    try {
      const indicatorData = {
        ...request,
        lastUpdate: request.lastUpdate || new Date(),
      };
      const indicator = Indicator.create(indicatorData);
      await this.indicatorRepository.save(indicator);
      return this.mapToResponse(indicator);
    } catch (error) {
      throw new Error(`Error al crear indicador: ${(error as Error).message}`);
    }
  }

  private mapToResponse(indicator: Indicator): IndicatorResponse {
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
