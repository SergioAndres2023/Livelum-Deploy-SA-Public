import { Finding } from '../../domain/entities/Finding';
import type { FindingRepository } from '../../domain/contracts/FindingRepository';
import { CreateFindingRequest } from '../dtos/CreateFindingRequest';
import { FindingResponse } from '../dtos/FindingResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class CreateFindingUseCase {
  constructor(
    private readonly findingRepository: FindingRepository,
    private readonly logger: Logger,
  ) {}

  async execute(request: CreateFindingRequest): Promise<FindingResponse> {
    this.logger.info('Creando nuevo hallazgo', { summary: request.summary });

    try {
      const finding = Finding.create(request);
      await this.findingRepository.save(finding);

      this.logger.info('Hallazgo creado exitosamente', { findingId: finding.id });
      return this.mapToResponse(finding);
    } catch (error) {
      this.logger.error('Error al crear hallazgo', { error: (error as Error).message, request });
      throw error;
    }
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
