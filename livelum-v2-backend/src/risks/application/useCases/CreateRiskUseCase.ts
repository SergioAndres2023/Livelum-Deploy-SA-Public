import { Risk } from '../../domain/entities/Risk';
import type { RiskRepository } from '../../domain/contracts/RiskRepository';
import { CreateRiskRequest } from '../dtos/CreateRiskRequest';
import { RiskResponse } from '../dtos/RiskResponse';

export class CreateRiskUseCase {
  constructor(
    private readonly riskRepository: RiskRepository,
  ) {}

  async execute(request: CreateRiskRequest): Promise<RiskResponse> {
    // Verificar que el código no esté en uso
    const existingByCode = await this.riskRepository.findByCode(request.code);
    if (existingByCode) {
      throw new Error(`Ya existe un riesgo con el código: ${request.code}`);
    }

    try {
      const risk = Risk.create(request);
      await this.riskRepository.save(risk);
      return this.mapToResponse(risk);
    } catch (error) {
      throw new Error(`Error al crear riesgo: ${(error as Error).message}`);
    }
  }

  private mapToResponse(risk: Risk): RiskResponse {
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
