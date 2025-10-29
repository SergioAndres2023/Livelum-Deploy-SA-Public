import type { RiskRepository } from '../../domain/contracts/RiskRepository';
import { UpdateRiskRequest } from '../dtos/UpdateRiskRequest';
import { RiskResponse } from '../dtos/RiskResponse';

export class UpdateRiskUseCase {
  constructor(
    private readonly riskRepository: RiskRepository,
  ) {}

  async execute(id: string, request: UpdateRiskRequest): Promise<RiskResponse> {
    const risk = await this.riskRepository.findById(id);
    
    if (!risk) {
      throw new Error(`Riesgo con ID ${id} no encontrado`);
    }

    try {
      risk.updateInfo(request);
      await this.riskRepository.update(risk);
      return this.mapToResponse(risk);
    } catch (error) {
      throw new Error(`Error al actualizar riesgo: ${(error as Error).message}`);
    }
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
