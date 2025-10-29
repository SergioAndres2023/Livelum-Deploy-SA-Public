import { Finding } from '../../domain/entities/Finding';
import type { FindingRepository } from '../../domain/contracts/FindingRepository';
import { AddActionRequest } from '../dtos/AddActionRequest';
import { FindingResponse } from '../dtos/FindingResponse';
import { FindingAction } from '../../domain/valueObjects/FindingAction';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class AddActionToFindingUseCase {
  constructor(
    private readonly findingRepository: FindingRepository,
    private readonly logger: Logger,
  ) {}

  async execute(findingId: string, request: AddActionRequest): Promise<FindingResponse> {
    this.logger.info('Agregando acción a hallazgo', { findingId, request });

    const finding = await this.findingRepository.findById(findingId);
    if (!finding) {
      throw new Error(`Hallazgo no encontrado con ID: ${findingId}`);
    }

    try {
      const action = FindingAction.create(
        request.description,
        request.responsible,
        request.plannedDate,
        request.comments
      );

      finding.addAction(action);
      await this.findingRepository.save(finding);

      this.logger.info('Acción agregada exitosamente', { findingId, actionId: action.id });
      return this.mapToResponse(finding);
    } catch (error) {
      this.logger.error('Error al agregar acción', { error: (error as Error).message, findingId, request });
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
