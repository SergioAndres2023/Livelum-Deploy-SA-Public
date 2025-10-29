import type { RiskRepository } from '../../domain/contracts/RiskRepository';
import { RiskResponse } from '../dtos/RiskResponse';

export class FindRiskByCodeUseCase {
  constructor(
    private readonly riskRepository: RiskRepository,
  ) {}

  async execute(code: string): Promise<RiskResponse | null> {
    const risk = await this.riskRepository.findByCode(code);
    
    if (!risk) {
      return null;
    }

    return this.mapToResponse(risk);
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
