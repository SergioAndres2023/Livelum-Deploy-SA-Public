import { Finding } from '../../domain/entities/Finding';
import type { FindingRepository } from '../../domain/contracts/FindingRepository';
import { UpdateFindingRequest } from '../dtos/UpdateFindingRequest';
import { FindingResponse } from '../dtos/FindingResponse';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class UpdateFindingUseCase {
  constructor(
    private readonly findingRepository: FindingRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, request: UpdateFindingRequest): Promise<FindingResponse> {
    this.logger.info('Actualizando hallazgo', { id, request });

    const finding = await this.findingRepository.findById(id);
    if (!finding) {
      throw new Error(`Hallazgo no encontrado con ID: ${id}`);
    }

    try {
      finding.update(request);
      await this.findingRepository.save(finding);

      this.logger.info('Hallazgo actualizado exitosamente', { findingId: finding.id });
      return this.mapToResponse(finding);
    } catch (error) {
      this.logger.error('Error al actualizar hallazgo', { error: (error as Error).message, id, request });
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
